import { useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import GenericModal from "@components/ui/GenericModal";
import type { Student } from "../types/sessions.types";
import type { Session } from "../types/sessions.types";

const capitalizeWords = (text: string): string =>
  text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
export const TitleCell = ({ data }: { data: Session }) => (
  <div className="flex flex-col gap-3 p-2">
    <div className="rounded-xl bg-blue-100 p-2 shadow-sm font-semibold text-blue-900">
      {data.title}
    </div>
  </div>
);

export const DateCell = ({ data }: { data: Session }) => (
  <div className="flex flex-col gap-1 p-2 text-sm">
    <div className="bg-green-100 text-green-800 px-2 py-1 rounded">
      Start: {new Date(data.startdate).toLocaleDateString("fr-FR")}
    </div>
    <div className="bg-green-100 text-green-800 px-2 py-1 rounded">
      End: {new Date(data.enddate).toLocaleDateString("fr-FR")}
    </div>
  </div>
);

export const TeacherCell = ({ data }: { data: Session }) => (
  <div className="p-2">
    <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
      {data.teacher}
    </div>
  </div>
);

export const FrequencyCell = ({ data }: { data: Session }) => (
  <div className="p-2">
    <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
      {capitalizeWords(data.Frequency)}
    </div>
  </div>
);
export const StudentsCell = ({ students }: { students: Student[] }) => {
  const limit = 6;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleViewAll = (students: Student[]) => {
    setSelectedStudents(students);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedStudents([]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        alignItems: "center",
        padding: "8px",
      }}
    >
      {students.slice(0, limit).map((student) => (
        <Tooltip key={student.id} label={capitalizeWords(student.name)} placement="top" hasArrow>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#F1F5F9",
              padding: "0 4px",
              borderRadius: "20px",
              fontSize: "0.875rem",
              border: "1px solid #CBD5E0",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#3B82F6",
                color: "#FFFFFF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
              }}
            >
              {getInitials(student.name)}
            </span>
            <span
              style={{
                maxWidth: "180px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {capitalizeWords(student.name)}
            </span>
          </div>
        </Tooltip>
      ))}

      {students.length > limit && (
        <button
          style={{
            padding: "2px 8px",
            background: "#EDF2F7",
            borderRadius: "15px",
            fontSize: "0.875rem",
            cursor: "pointer",
            color: "#3B82F6",
            border: "1px solid #CBD5E0",
          }}
          onClick={() => handleViewAll(students)}
        >
          +{students.length - limit} more
        </button>
      )}

      <GenericModal
        isOpen={isOpen}
        onClose={handleClose}
        title="All Students"
        size="md"
        closeOnOverlayClick={false}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "6px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {selectedStudents.map((student) => (
            <div
              key={student.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#3B82F6",
                  color: "#FFFFFF",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {getInitials(student.name)}
              </span>
              <span>{capitalizeWords(student.name)}</span>
            </div>
          ))}
        </div>
      </GenericModal>
    </div>
  );
};
