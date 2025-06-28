import { useState, useMemo } from "react";
import type { SessionTracking } from "../types";

export const useSessionFilters = (sessionsData: SessionTracking[]) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

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

  const filteredSessions = useMemo(() => {
    return sessionsData.filter((session: SessionTracking) => {
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
            matchesStatus = session.isValidated;
            break;
          case "attendance_taken":
            matchesStatus = session.isAttendanceMarked && !session.isValidated;
            break;
          case "pending":
            matchesStatus = !session.isAttendanceMarked && !session.isCanceled;
            break;
          case "canceled":
            matchesStatus = session.isCanceled;
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
  };
};
