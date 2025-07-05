

type FormValues = {
    [key: string]: any;
};

export const GUARDIAN_COLORS = {
    father: "green",
    mother: "pink",
    other: "purple",
    tutor: "teal",
} as const;

export type FormContentRef = {
    submitForm: () => Promise<FormValues | null>;
    resetForm: () => void;
};

// Constants
export const FIELD_PREFIXES = {
    FATHER: "father_",
    MOTHER: "mother_",
    TUTOR: "tutor_",
} as const;


const separateFormData = (values: FormValues) => {
    const studentData: any = {};
    const fatherData: any = {};
    const motherData: any = {};
    const tutorData: any = {};

    Object.entries(values).forEach(([key, value]) => {
        if (key.startsWith(FIELD_PREFIXES.FATHER)) {
            const fieldName = key.replace(FIELD_PREFIXES.FATHER, "");
            fatherData[fieldName] = value;
        } else if (key.startsWith(FIELD_PREFIXES.MOTHER)) {
            const fieldName = key.replace(FIELD_PREFIXES.MOTHER, "");
            motherData[fieldName] = value;
        } else if (key.startsWith(FIELD_PREFIXES.TUTOR)) {
            const fieldName = key.replace(FIELD_PREFIXES.TUTOR, "");
            tutorData[fieldName] = value;
        } else if (!["levelId", "guardianType"].includes(key)) {
            studentData[key] = value;
        }
    });

    return { studentData, fatherData, motherData, tutorData };
};
export default separateFormData;