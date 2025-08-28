import { useState, useMemo, useEffect } from "react";
import type { SessionSchuduleDate } from "../types";

const baseColors = ["blue", "orange", "green", "purple", "red", "cyan", "teal"];

const generateRandomColor = () => {
  const index = Math.floor(Math.random() * baseColors.length);
  return baseColors[index];
};

export const useSessionFilters = (sessionsData: SessionSchuduleDate[]) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  useEffect(() => {
    clearFilters();
  }, [sessionsData]);

  const filterOptions = useMemo(() => {
    const levels = [...new Set(sessionsData.map((session) => session.level))];
    const days = [...new Set(sessionsData.map((session) => session.day))];
    const subjects = [
      ...new Set(sessionsData.map((session) => session.subject)),
    ];
    const staff = [
      ...new Set(
        sessionsData.map(
          (session) => `${session.firstName} ${session.lastName}`
        )
      ),
    ];

    return { days, subjects, staff, levels };
  }, [sessionsData]);

  const subjectColors = useMemo(() => {
    const colorsMap: Record<string, string> = {};
    filterOptions.subjects.forEach((subject) => {
      colorsMap[subject] = generateRandomColor();
    });
    return colorsMap;
  }, [filterOptions.subjects]);

  const filteredSessions = useMemo(() => {
    return sessionsData.filter((session: SessionSchuduleDate) => {
      const matchesDay = !selectedDay || session.day === selectedDay;
      const matchesLevel = !selectedLevel || session.level === selectedLevel;
      const matchesSubject =
        !selectedSubject || session.subject === selectedSubject;
      const matchesStaff =
        !selectedStaff ||
        `${session.firstName} ${session.lastName}` === selectedStaff;

      let matchesStatus = true;
      if (selectedStatus) {
        switch (selectedStatus) {
          case "validated":
            matchesStatus = session.validated;
            break;
          case "attendance_taken":
            matchesStatus = session.attendanceMarked && !session.validated;
            break;
          case "pending":
            matchesStatus = !session.attendanceMarked && !session.canceled;
            break;
          case "canceled":
            matchesStatus = session.canceled;
            break;
          default:
            matchesStatus = true;
        }
      }

      return (
        matchesDay &&
        matchesLevel &&
        matchesSubject &&
        matchesStaff &&
        matchesStatus
      );
    });
  }, [
    sessionsData,
    selectedDay,
    selectedLevel,
    selectedSubject,
    selectedStatus,
    selectedStaff,
  ]);

  const clearFilters = () => {
    setSelectedDay("");
    setSelectedLevel("");
    setSelectedSubject("");
    setSelectedStatus("");
    setSelectedStaff("");
  };

  const hasActiveFilters =
    !!selectedDay ||
    !!selectedLevel ||
    !!selectedSubject ||
    !!selectedStatus ||
    !!selectedStaff;

  return {
    selectedDay,
    selectedLevel,
    selectedSubject,
    selectedStatus,
    selectedStaff,
    setSelectedDay,
    setSelectedLevel,
    setSelectedSubject,
    setSelectedStatus,
    setSelectedStaff,
    filteredSessions,
    filterOptions,
    hasActiveFilters,
    clearFilters,
    subjectColors,
  };
};
