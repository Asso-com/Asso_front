import type { StudentEnrollmentDetails } from "../types";

const mockStudents: StudentEnrollmentDetails[] = [
    {
        student: {
            id: "6b197dc7-55be-4e58-8c71-4dfadd33083d",
            registrationId: "STU-2025-LSVC",
            firstName: "Ilyes",
            lastName: "NEJJARI",
            email: "ilyes.nejjari.590@assocomm.com",
        },
        academicPeriod: {
            id: 1,
            code: "AP-2025-2025-001",
            description: "Mathematics Class - Algebra Basics",
            active: true,
        },
        levelSubjects: [
            {
                id: "37fa1e27-cd32-402d-9632-c699e3e18088",
                //levelSubjectId: 35,
                level: {
                    id: 19,
                    code: "A1",
                    name: "Niveau introductif (A1)",
                    order: 2,
                },
                subject: { id: 6, name: "Allemand", code: "SUB-LANG-005" },
                createdAt: "2025-07-03T17:19:12",
                updatedAt: "2025-07-03T17:19:12",
            },
            {
                id: "3ea849c2-15b1-4537-8114-7841b97ef2bd",
                //levelSubjectId: 34,
                level: {
                    id: 19,
                    code: "A1",
                    name: "Niveau introductif (A1)",
                    order: 2,
                },
                subject: { id: 4, name: "Espagnol", code: "SUB-LANG-003" },
                createdAt: "2025-07-03T17:18:51",
                updatedAt: "2025-07-03T17:18:51",
            },
        ],
    },
    {
        student: {
            id: "7c298eb8-66cf-4f69-9d82-5efbee44194e",
            registrationId: "STU-2025-MKTR",
            firstName: "Sarah",
            lastName: "MARTIN",
            email: "sarah.martin.234@assocomm.com",
        },
        academicPeriod: {
            id: 1,
            code: "AP-2025-2025-001",
            description: "Mathematics Class - Algebra Basics",
            active: true,
        },
        levelSubjects: [
            {
                id: "48fa2e38-de43-513e-a743-d800f4f29199",
                //levelSubjectId: 36,
                level: {
                    id: 20,
                    code: "B1",
                    name: "Niveau intermédiaire (B1)",
                    order: 3,
                },
                subject: { id: 5, name: "Français", code: "SUB-LANG-004" },
                createdAt: "2025-07-03T16:45:30",
                updatedAt: "2025-07-03T16:45:30",
            },
            {
                id: "59fb3f49-ef54-624f-b854-e911g5g3a2aa",
                //levelSubjectId: 37,
                level: {
                    id: 21,
                    code: "B2",
                    name: "Niveau intermédiaire avancé (B2)",
                    order: 4,
                },
                subject: { id: 3, name: "Anglais", code: "SUB-LANG-002" },
                createdAt: "2025-07-03T16:30:15",
                updatedAt: "2025-07-03T16:30:15",
            },
            {
                id: "6afc4g5a-fg65-735g-c965-fa22h6h4b3bb",
                //levelSubjectId: 38,
                level: {
                    id: 19,
                    code: "A1",
                    name: "Niveau introductif (A1)",
                    order: 2,
                },
                subject: { id: 7, name: "Italien", code: "SUB-LANG-006" },
                createdAt: "2025-07-03T15:20:45",
                updatedAt: "2025-07-03T15:20:45",
            },
        ],
    },
    {
        student: {
            id: "8d3a9fc9-77dg-5g7a-ae93-6fgcff55205f",
            registrationId: "STU-2025-ABCD",
            firstName: "Ahmed",
            lastName: "BENHAMED",
            email: "ahmed.benhamed.789@assocomm.com",
        },
        academicPeriod: {
            id: 1,
            code: "AP-2025-2025-001",
            description: "Mathematics Class - Algebra Basics",
            active: true,
        },
        levelSubjects: [
            {
                id: "7bgd5h6b-gh76-846h-d076-gb33i7i5c4cc",
                //levelSubjectId: 39,
                level: { id: 22, code: "C1", name: "Niveau avancé (C1)", order: 5 },
                subject: { id: 3, name: "Anglais", code: "SUB-LANG-002" },
                createdAt: "2025-07-03T14:15:20",
                updatedAt: "2025-07-03T14:15:20",
            },
        ],
    },
];
export default mockStudents;