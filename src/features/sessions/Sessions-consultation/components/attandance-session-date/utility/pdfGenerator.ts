import { jsPDF } from "jspdf";
import logoApp from "../../../../../../assets/logo/logo_app.png";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import type { Attendance } from "@features/sessions/Sessions-consultation/types";
import { formatDateOnly, formatTime } from "@utils/timeUtils";

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  presentRate: number;
}

export interface GeneratePdfOptions {
  sessionData: SessionSchuduleDate;
  attendance: Attendance[];
  stats: AttendanceStats;
  teacherSummary?: string;
  administrationSummary?: string;
}

function getBase64ImageFromURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context is null"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (error) => reject(error);
    img.src = url;
  });
}



export async function generatePdf({
  sessionData,
  attendance,
  stats,
  teacherSummary = "",
  administrationSummary = "",
}: GeneratePdfOptions): Promise<void> {

  try {
    const doc = new jsPDF("p", "mm", "a4");
    const logoBase64 = await getBase64ImageFromURL(logoApp as string);
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    const addPageHeader = (pageNum: number): number => {
      doc.setFillColor(240, 248, 255);
      doc.rect(0, 0, pageWidth, 25, "F");
      doc.addImage(logoBase64, "PNG", margin, 5, 20, 15);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 58, 138);
      doc.text("FICHE DE PRÉSENCE", pageWidth / 2, 15, { align: "center" });
      if (pageNum > 1) {
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Page ${pageNum}`, pageWidth - margin, 15, { align: "right" });
      }
      return 30;
    };

    const addSessionInfo = (y: number): number => {
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y, contentWidth, 35, "F");
      doc.setLineWidth(0.5);
      doc.setDrawColor(229, 231, 235);
      doc.rect(margin, y, contentWidth, 35);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("INFORMATIONS DE LA SESSION", margin + 5, y + 8);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const leftX = margin + 5;
      doc.text(`Matière: ${sessionData.subject || "N/A"}`, leftX, y + 16);
      doc.text(`Groupe: ${sessionData.sessionCode || "N/A"}`, leftX, y + 22);
      doc.text(`Enseignant: ${sessionData.firstName || ""} ${sessionData.lastName || ""}`.trim(), leftX, y + 28);
      const rightX = margin + contentWidth / 2 + 5;
      doc.text(`Date: ${formatDateOnly(sessionData.sessionDate, {
        format: "full",
      })}`, rightX, y + 16);
      doc.text(`Horaire: ${formatTime(sessionData.startTime, sessionData.timeZone)} - ${formatTime(sessionData.endTime, sessionData.timeZone)}`, rightX, y + 22);
      doc.text(`Salle: ${sessionData.classRoom || "N/A"} | Niveau: ${sessionData.level || "N/A"}`, rightX, y + 28);
      return y + 45;
    };


    const addStatsSection = (y: number): number => {
      doc.setFillColor(240, 253, 244);
      doc.rect(margin, y, contentWidth, 20, "F");
      doc.setDrawColor(34, 197, 94);
      doc.rect(margin, y, contentWidth, 20);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("STATISTIQUES DE PRÉSENCE", margin + 5, y + 8);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const statsText = `Total: ${stats.total} | Présents: ${stats.present} (${stats.presentRate}%) | Absents: ${stats.absent} | Retards: ${stats.late}`;
      doc.text(statsText, margin + 5, y + 15);
      return y + 30;
    };

    const addStudentTable = (y: number): number => {
      const headers = ["#", "Matricule", "Nom", "Prénom", "Statut", "Évaluation"];
      const columnWidths = [15, 30, 40, 40, 25, 30];
      let currentY = y;
      doc.setFillColor(59, 130, 246);
      doc.rect(margin, currentY, contentWidth, 8, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      let currentX = margin;
      headers.forEach((header, index) => {
        doc.text(header, currentX + 2, currentY + 5.5);
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.2);
        if (index < headers.length - 1) {
          doc.line(currentX + columnWidths[index], currentY, currentX + columnWidths[index], currentY + 8);
        }
        currentX += columnWidths[index];
      });
      currentY += 8;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      attendance.forEach((student, index) => {
        if (currentY > pageHeight - 100) {
          doc.addPage();
          currentY = addPageHeader(Math.ceil((index + 1) / 25) + 1);
          doc.setFillColor(59, 130, 246);
          doc.rect(margin, currentY, contentWidth, 8, "F");
          doc.setFont("helvetica", "bold");
          doc.setTextColor(255, 255, 255);
          currentX = margin;
          headers.forEach((header, hIndex) => {
            doc.text(header, currentX + 2, currentY + 5.5);
            currentX += columnWidths[hIndex];
          });
          currentY += 8;
          doc.setFont("helvetica", "normal");
          doc.setTextColor(0, 0, 0);
        }
        if (index % 2 === 0) {
          doc.setFillColor(249, 250, 251);
          doc.rect(margin, currentY, contentWidth, 6, "F");
        }
        let statusColor: [number, number, number] = [0, 0, 0];
        let statusText = "N/A";
        switch (student.attendanceType) {
          case "PRESENT":
            statusColor = [34, 197, 94];
            statusText = "Présent";
            break;
          case "ABSENT":
            statusColor = [239, 68, 68];
            statusText = "Absent";
            break;
          case "LATE":
            statusColor = [245, 158, 11];
            statusText = "Retard";
            break;
        }
        const rowData = [
          String(index + 1),
          String(student.registrationId || "N/A"),
          String(student.lastName || "N/A"),
          String(student.firstName || "N/A"),
          String(statusText),
          String(student.evaluation || "N/A"),
        ];
        currentX = margin;
        rowData.forEach((data, cellIndex) => {
          if (cellIndex === 4) {
            doc.setTextColor(...statusColor);
            doc.setFont("helvetica", "bold");
          } else {
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");
          }
          const cellText = String(data).substring(0, 20);
          doc.text(cellText, currentX + 2, currentY + 4);
          currentX += columnWidths[cellIndex];
        });
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.1);
        doc.rect(margin, currentY, contentWidth, 6);
        currentY += 6;
      });
      return currentY + 10;
    };

    const addSummarySection = (
      y: number,
      teacherSummary: string,
      administrationSummary: string
    ): number => {
      doc.setFillColor(252, 252, 252);
      doc.rect(margin, y, contentWidth, 50, "F");
      doc.setLineWidth(0.5);
      doc.setDrawColor(229, 231, 235);
      doc.rect(margin, y, contentWidth, 50);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("RÉSUMÉS ET COMMENTAIRES", margin + 5, y + 8);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setFont("helvetica", "bold");
      doc.text("Commentaire Enseignant:", margin + 5, y + 18);
      doc.setFont("helvetica", "normal");
      if (teacherSummary && teacherSummary.trim()) {
        const teacherLines = doc.splitTextToSize(teacherSummary, contentWidth / 2 - 15);
        doc.text(teacherLines, margin + 5, y + 24);
      } else {
        doc.setTextColor(150, 150, 150);
        doc.text("Aucun commentaire", margin + 5, y + 24);
        doc.setTextColor(0, 0, 0);
      }
      const rightX = margin + contentWidth / 2 + 5;
      doc.setFont("helvetica", "bold");
      doc.text("Commentaire Administration:", rightX, y + 18);
      doc.setFont("helvetica", "normal");
      if (administrationSummary && administrationSummary.trim()) {
        const adminLines = doc.splitTextToSize(administrationSummary, contentWidth / 2 - 15);
        doc.text(adminLines, rightX, y + 24);
      } else {
        doc.setTextColor(150, 150, 150);
        doc.text("Aucun commentaire", rightX, y + 24);
        doc.setTextColor(0, 0, 0);
      }
      return y + 60;
    };

    const addFooter = (): void => {
      const footerY = pageHeight - 20;
      doc.setFillColor(249, 250, 251);
      doc.rect(0, footerY, pageWidth, 20, "F");
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      const now = new Date();
      const timestamp = `Généré le ${now.toLocaleDateString("fr-FR")} à ${now.toLocaleTimeString("fr-FR")}`;
      doc.text(timestamp, pageWidth / 2, footerY + 12, { align: "center" });
      doc.setFontSize(8);
      doc.text("Signature Enseignant:", margin, footerY + 8);
      doc.text("Signature Administration:", pageWidth - margin - 40, footerY + 8);
      doc.setLineWidth(0.5);
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, footerY + 15, margin + 60, footerY + 15);
      doc.line(pageWidth - margin - 60, footerY + 15, pageWidth - margin, footerY + 15);
    };

    let currentY = addPageHeader(1);
    currentY = addSessionInfo(currentY);
    currentY = addStatsSection(currentY);
    currentY = addStudentTable(currentY);
    currentY = addSummarySection(currentY, teacherSummary, administrationSummary);
    addFooter();
    const dateStr = sessionData.sessionDate
      ? new Date(sessionData.sessionDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];
    const fileName = `fiche_presence_${sessionData.sessionCode || "session"}_${dateStr}.pdf`;
    doc.save(fileName);

  } catch (error) {

  }
} 