import { useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import GenericModal from "@components/ui/GenericModal";
import type { Session, Student } from "../types/sessions.types";
import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";

export const SessionDetailsCell = ({ data }: { data: Session }) => (
  <div className="flex flex-col gap-3 p-2">
    <div className="rounded-xl bg-blue-100 p-2 shadow-sm font-semibold text-blue-900">
      {data.title}
    </div>
    <div className="text-sm space-y-1">
      <div className="bg-green-100 text-green-800 px-2 py-1 rounded">
        Date : {new Date(data.date).toLocaleDateString("fr-FR")}
      </div>
      <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
        Formateur : {data.teacher}
      </div>
      <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
        Durée : {data.duration}
      </div>
    </div>
  </div>
);

export const StudentsCell = ({ students }: { students: Student[] }) => {
  const limit = 5;
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
        <Tooltip key={student.id} label={student.name} placement="top" hasArrow>
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
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
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
            )}
            <span
              style={{
                maxWidth: "80px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {student.name}
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
        title="all_participants"
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
              {student.avatar ? (
                <img
                  src={student.avatar}
                  alt={student.name}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
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
              )}
              <span>{student.name}</span>
            </div>
          ))}
        </div>
      </GenericModal>
    </div>
  );
};

export const ActionsCell = ({
  data,
  onEdit,
  onDelete,
}: {
  data: Session;
  onEdit: any;
  onDelete: any;
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<MdEdit size={24} />}
        label="Modifier"
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="md"
        onClick={() => onEdit(data)}
      />
      <GenericIconButtonWithTooltip
        icon={<MdDelete size={24} />}
        label="Supprimer"
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="md"
        onClick={() => onDelete(data)}
      />
      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title="Modifier Session"
        size="md"
      >
        {/* Modal content goes here */}
      </GenericModal>
    </Flex>
  );
};