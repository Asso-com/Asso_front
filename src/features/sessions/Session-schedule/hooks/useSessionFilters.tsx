import { useState, useMemo } from "react";
import type { SessionTracking } from "../types";

export const useSessionFilters = (sessionsData: SessionTracking[]) => {
    
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  const filterOptions = useMemo(() => {
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

    return { days, subjects, staff };
  }, [sessionsData]);

  const filteredSessions = useMemo(() => {
    return sessionsData.filter((session: SessionTracking) => {
      const matchesSearch =
        !searchTerm ||
        session.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${session.firstName} ${session.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        session.classRoom.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDay = !selectedDay || session.day === selectedDay;
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
        matchesSearch &&
        matchesDay &&
        matchesSubject &&
        matchesStaff &&
        matchesStatus
      );
    });
  }, [
    sessionsData,
    searchTerm,
    selectedDay,
    selectedSubject,
    selectedStatus,
    selectedStaff,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDay("");
    setSelectedSubject("");
    setSelectedStatus("");
    setSelectedStaff("");
  };

  const hasActiveFilters =
    !!searchTerm ||
    !!selectedDay ||
    !!selectedSubject ||
    !!selectedStatus ||
    !!selectedStaff;

  return {
    searchTerm,
    selectedDay,
    selectedSubject,
    selectedStatus,
    selectedStaff,
    setSearchTerm,
    setSelectedDay,
    setSelectedSubject,
    setSelectedStatus,
    setSelectedStaff,
    filteredSessions,
    filterOptions,
    hasActiveFilters,
    clearFilters,
  };
};
