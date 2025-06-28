// mock-data.ts
import type { Student, SessionStep } from "../types/addsession.types";
import { InfoIcon, CheckIcon} from "@chakra-ui/icons";
import { FaCalendar } from "react-icons/fa";
export const MOCK_STUDENTS: Student[] = [
  {
    matricule: "100",
    prenom: "Bader",
    nom: "BEN RHOUMA",
    niveau: "1ère",
  },
  {
    matricule: "129",
    prenom: "Yazid",
    nom: "DJOUAHER",
    niveau: "Terminale",
  },
  {
    matricule: "165",
    prenom: "Ouzna",
    nom: "MERHAB",
    niveau: "Terminale",
  },
  {
    matricule: "180",
    prenom: "Riles",
    nom: "BOUSSAID",
    niveau: "3ème",
  },
  {
    matricule: "211",
    prenom: "Mariam",
    nom: "HAMOUALI",
    niveau: "4ème",
  },
];

export const SESSION_STEPS: SessionStep[] = [
  { title: "Basic Info", description: "Complete session details", icon: InfoIcon },
  { title: "Schedule", description: "Set up schedule", icon: FaCalendar },
  { title: "Select Students", description: "Select students", icon: CheckIcon },
];
