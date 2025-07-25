import type { Field } from "@/types/formTypes";

const BookFormFields: Field[] = [
  {
    name: "bookTitle",
    label: "Book Title",
    type: "text",
    placeholder: "Enter book title",
    validationRules: { required: true, maxLength: 255 },
  },
  {
    name: "bookNo",
    label: "Book Number",
    type: "text",
    placeholder: "Enter book number",
    validationRules: { required: true, maxLength: 50 },
  },
  {
    name: "isbnNo",
    label: "ISBN Number",
    type: "text",
    placeholder: "Enter ISBN number",
    validationRules: { required: true, maxLength: 20 },
  },
  {
    name: "author",
    label: "Author",
    type: "text",
    placeholder: "Enter author name",
    validationRules: { required: true, maxLength: 255 },
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Enter book subject",
    validationRules: { required: true, maxLength: 255 },
  },
  {
    name: "publish",
    label: "Publisher",
    type: "text",
    placeholder: "Enter publisher name",
    validationRules: { required: false, maxLength: 255 },
  },
  {
    name: "rackNo",
    label: "Rack Number",
    type: "text",
    placeholder: "Enter rack number",
    validationRules: { required: false, maxLength: 50 },
  },
  {
    name: "qty",
    label: "Quantity",
    type: "number",
    placeholder: "Enter quantity",
    validationRules: { required: true, min: 1 },
    inputProps: {
      min: 1,
      step: 1,
    },
  },
  {
    name: "perUnitCost",
    label: "Cost Per Unit",
    type: "number",
    placeholder: "Enter cost per unit",
    validationRules: { required: true, min: 0 },
    inputProps: {
      min: 0,
      step: 0.01,
    },
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter book description",
    validationRules: { required: true, maxLength: 1000 },
  },
  {
  name: "available",
  label: "Available",
  type: "checkbox",
  placeholder: "",
  validationRules: { required: false },
},
{
  name: "isActive",
  label: "Active",
  type: "checkbox",
  placeholder: "",
  validationRules: { required: false },
},
];

export default BookFormFields;