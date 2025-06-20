import type { Field } from "@/types/formTypes";

export const studentFields: Field[] = [
  {
    name: 'registration_id',
    type: 'text',
    label: 'Registration ID',
    placeholder: 'Admission number',
    validationRules: { required: true, maxLength: 50 }
  },
  {
    name: 'first_name',
    type: 'text',
    label: 'First Name',
    placeholder: 'Enter first name',
    validationRules: { required: true, maxLength: 255 }
  },
  {
    name: 'last_name',
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
    name: 'date_of_birth',
    type: 'date',
    label: 'Date of Birth',
    validationRules: { required: true }
  },
  {
    name: 'mobile_number',
    type: 'phone',
    label: 'Phone Number',
    placeholder: 'Enter phone number'
  },
  {
    name: 'address',
    type: 'text',
    label: 'Address',
    placeholder: 'Enter full address',
    validationRules: { maxLength: 255 }
  },
  {
    name: 'city',
    type: 'text',
    label: 'City',
    placeholder: 'Enter city',
    validationRules: { maxLength: 255 }
  },
  {
    name: 'state',
    type: 'text',
    label: 'State/Region',
    placeholder: 'Enter state or region',
    validationRules: { maxLength: 50 }
  },
  {
    name: 'zip_code',
    type: 'text',
    label: 'Postal Code',
    placeholder: 'Enter postal code',
    validationRules: { maxLength: 255 }
  }
];

export const parentFields: Field[] = [
  // Father fields
  {
    name: 'father_first_name',
    type: 'text',
    label: "Father's First Name",
    placeholder: "Enter father's first name",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'father_last_name',
    type: 'text',
    label: "Father's Last Name",
    placeholder: "Enter father's last name",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'father_email',
    type: 'email',
    label: "Father's Email",
    placeholder: "Enter father's email",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'father_mobile_number',
    type: 'phone',
    label: "Father's Phone",
    placeholder: "Enter father's phone number"
  },
  {
    name: 'father_occupation',
    type: 'text',
    label: "Father's Occupation",
    placeholder: "Enter father's occupation",
    validationRules: { maxLength: 100 }
  },
  // Mother fields
  {
    name: 'mother_first_name',
    type: 'text',
    label: "Mother's First Name",
    placeholder: "Enter mother's first name",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'mother_last_name',
    type: 'text',
    label: "Mother's Last Name",
    placeholder: "Enter mother's last name",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'mother_email',
    type: 'email',
    label: "Mother's Email",
    placeholder: "Enter mother's email",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'mother_mobile_number',
    type: 'phone',
    label: "Mother's Phone",
    placeholder: "Enter mother's phone number"
  },
  {
    name: 'mother_occupation',
    type: 'text',
    label: "Mother's Occupation",
    placeholder: "Enter mother's occupation",
    validationRules: { maxLength: 100 }
  }
];

export const guardianFields: Field[] = [
  {
    name: 'tutor_first_name',
    type: 'text',
    label: "Guardian's First Name",
    placeholder: "Enter guardian's first name",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'tutor_last_name',
    type: 'text',
    label: "Guardian's Last Name",
    placeholder: "Enter guardian's last name",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'tutor_email',
    type: 'email',
    label: "Guardian's Email",
    placeholder: "Enter guardian's email",
    validationRules: { maxLength: 255 }
  },
  {
    name: 'tutor_mobile_number',
    type: 'phone',
    label: "Guardian's Phone",
    placeholder: "Enter guardian's phone number"
  } 
];

export const additionalFields: Field[] = [
  {
    name: 'admission_date',
    type: 'date',
    label: 'Admission Date'
  },
  {
    name: 'establishment',
    type: 'text',
    label: 'School/Institution',
    placeholder: 'School name',
    validationRules: { maxLength: 100 }
  },
  {
    name: 'child_can_return_alone',
    type: 'checkbox',
    label: 'Can return home alone'
  },
  {
    name: 'authorization_photo_pub',
    type: 'checkbox',
    label: 'Photo publication authorization'
  },
  {
    name: 'qpv',
    type: 'checkbox',
    label: 'Priority Education Zone (QPv)'
  }
];