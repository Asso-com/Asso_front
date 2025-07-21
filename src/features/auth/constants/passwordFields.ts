import type { Field } from "@/types/formTypes";

// Define the form fields
const passwordFields: Field[] = [
  {
    name: "newPassword",
    type: "password",
    label: "New Password",
    placeholder: "Enter new password",
    validationRules: {
      required: true,
      minLength: 8,
    },
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm New Password",
    placeholder: "Confirm new password",
    validationRules: {
      required: true,
      matchesField: {
        field: "newPassword",
        message: "Passwords must match",
      },
    },
  },
];
export default passwordFields