import type { Field } from "@/types/formTypes";

export const studentFields: Field[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'Enter first name',
    validationRules: { required: true, maxLength: 255 }
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Enter last name',
    validationRules: { required: true, maxLength: 255 }
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    validationRules: { required: true, maxLength: 255 }
  },
  {
    name: 'gender',
    type: 'select',
    label: 'Gender',
    options: [
      { value: 'FEMALE', label: 'Female' },
      { value: 'MALE', label: 'Male' }
    ],
    validationRules: { required: true }
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    label: 'Date of Birth',
    validationRules: { required: true }
  },
  {
    name: 'mobileNumber',
    type: 'phone',
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    validationRules: { required: true }
  },
  {
    name: 'address',
    type: 'textarea',
    label: 'Address',
    placeholder: 'Enter full address',
    validationRules: { maxLength: 255, required: true }
  },
  {
    name: 'city',
    type: 'text',
    label: 'City',
    placeholder: 'Enter city',
    validationRules: { maxLength: 50 }
  },
  {
    name: 'state',
    type: 'text',
    label: 'State/Region',
    placeholder: 'Enter state or region',
    validationRules: { maxLength: 50 }
  },
  {
    name: 'zipCode',
    type: 'text',
    label: 'Postal Code',
    placeholder: 'Enter postal code',
    validationRules: { maxLength: 255 }
  },
  {
    name: 'admissionDate',
    type: 'date',
    label: 'Admission Date',
    validationRules: { required: true }
  },
  {
    name: 'establishment',
    type: 'text',
    label: 'School/Institution',
    placeholder: 'School name',
    validationRules: { maxLength: 100 }
  },
  {
    name: 'childCanReturnAlone',
    type: 'checkbox',
    label: 'Can return home alone'
  },
  {
    name: 'authorizationPhotoPub',
    type: 'checkbox',
    label: 'Photo publication authorization'
  },
  {
    name: 'qpv',
    type: 'checkbox',
    label: 'Priority Education Zone (QPv)'
  }
];

// Separate father and mother fields
export const fatherFields: Field[] = [
  {
    name: 'firstName',
    type: 'text',
    label: "Father's First Name",
    placeholder: "Enter father's first name",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'lastName',
    type: 'text',
    label: "Father's Last Name",
    placeholder: "Enter father's last name",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'email',
    type: 'email',
    label: "Father's Email",
    placeholder: "Enter father's email",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'mobileNumber',
    type: 'phone',
    label: "Father's Phone",
    placeholder: "Enter father's phone number",
    validationRules: { required: true, }
  },
  {
    name: 'occupation',
    type: 'text',
    label: "Father's Occupation",
    placeholder: "Enter father's occupation",
    validationRules: { maxLength: 100 }
  }
];

export const motherFields: Field[] = [
  {
    name: 'firstName',
    type: 'text',
    label: "Mother's First Name",
    placeholder: "Enter mother's first name",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'lastName',
    type: 'text',
    label: "Mother's Last Name",
    placeholder: "Enter mother's last name",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'email',
    type: 'email',
    label: "Mother's Email",
    placeholder: "Enter mother's email",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'mobileNumber',
    type: 'phone',
    label: "Mother's Phone",
    placeholder: "Enter mother's phone number",
    validationRules: { required: true, }
  },
  {
    name: 'occupation',
    type: 'text',
    label: "Mother's Occupation",
    placeholder: "Enter mother's occupation",
    validationRules: { maxLength: 100 }
  }
];

// Keep the original parentFields for backward compatibility
export const parentFields: Field[] = [
  ...fatherFields,
  ...motherFields
];

export const guardianFields: Field[] = [
  {
    name: 'firstName',
    type: 'text',
    label: "Guardian's First Name",
    placeholder: "Enter guardian's first name",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'lastName',
    type: 'text',
    label: "Guardian's Last Name",
    placeholder: "Enter guardian's last name",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'email',
    type: 'email',
    label: "Guardian's Email",
    placeholder: "Enter guardian's email",
    validationRules: { maxLength: 255, required: true, }
  },
  {
    name: 'mobileNumber',
    type: 'phone',
    label: "Guardian's Phone",
    placeholder: "Enter guardian's phone number",
    validationRules: { required: true, }
  }
];

export const levelFields: Field[] = [
  {
    name: 'levelId',
    type: 'select',
    label: 'Level/Grade',
    placeholder: 'Select level',
    options: [],
    validationRules: { required: true }
  },
];

export default {
  studentFields,
  fatherFields,
  motherFields,
  parentFields,
  guardianFields,
  levelFields
};