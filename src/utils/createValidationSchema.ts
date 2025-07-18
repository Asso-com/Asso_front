import * as Yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';
import type { Field } from '../types/formTypes'
import { validateDateWithinAcademicPeriods } from '@features/sessions/Add-session/validation/validators';


const transformNumber = (originalValue: any) => {
  if (originalValue === "" || originalValue == null) return undefined;
  const num = Number(originalValue);
  return isNaN(num) ? undefined : num;
};

export const AddSessionValidationSchema = (academicPeriods: any[] = []) =>
  Yup.object({
categoryId: Yup.number()
  .min(1, "Category is required")
  .required("Category is required"),

    levelSubjectId: Yup.number()
      .transform(transformNumber)
      .min(1, "Subject level is required")
      .required("Subject level is required"),

    staffId: Yup.string()
      .min(1, "Teacher is required")
      .required("Teacher is required"),

    periodicity: Yup.string()
      .oneOf(["WEEKLY", "MONTHLY"], "Please select a valid periodicity")
      .required("Periodicity is required"),

    sessionType: Yup.string()
      .oneOf(["ONLINE", "ONSITE"], "Please select a valid session type")
      .required("Session type is required"),

    startDate: Yup.string()
      .required("Start date is required")
      .test(
        "within-academic-period",
        "Start date must be within the active academic period",
        validateDateWithinAcademicPeriods(academicPeriods)
      ),

    endDate: Yup.string()
      .required("End date is required")
      .test("within-academic-period", function (value) {
        if (!value) return true;

        const inputDate = new Date(value);

        const activePeriod = academicPeriods.find((p) => {
          const start = new Date(p.startDate);
          const end = new Date(p.endDate);
          return p.active && inputDate >= start && inputDate <= end;
        });

        if (!activePeriod) {
          const hint = academicPeriods.find((p) => p.active)?.endDate;
          return this.createError({
            path: this.path,
            message: `End date must be within an active academic period (ends on ${new Date(
              hint
            ).toLocaleDateString()})`,
          });
        }

        return true;
      })
      .test(
        "after-start-date",
        "End date must be after start date",
        function (endDate) {
          const { startDate } = this.parent;
          if (!startDate || !endDate) return true;
          return new Date(endDate) > new Date(startDate);
        }
      ),

    maxStudentsCapacity: Yup.number()
      .transform(transformNumber)
      .min(1, "Capacity must be at least 1")
      .required("Capacity is required"),

    fees: Yup.number()
      .transform(transformNumber)
      .min(1, "Fees must be greater than 0")
      .required("Fees is required"),

    sessionSchedules: Yup.array()
      .of(
        Yup.object({
          classRoomId: Yup.number()
            .required("Room is required")
            .min(1, "Room is required"),

          day: Yup.string().required("Day is required"),

          startTime: Yup.string().required("Start time is required"),

          endTime: Yup.string()
            .required("End time is required")
            .test(
              "is-after-startTime",
              "End time must be after start time",
              function (endTime) {
                const { startTime } = this.parent;
                if (!startTime || !endTime) return true;

                const [startH, startM] = startTime.split(":").map(Number);
                const [endH, endM] = endTime.split(":").map(Number);

                const startMinutes = startH * 60 + startM;
                const endMinutes = endH * 60 + endM;

                return endMinutes > startMinutes;
              }
            ),
        })
      )
      .min(1, "At least one session schedule is required")
      .test("no-overlapping-times", "", function (sessions) {
        if (!Array.isArray(sessions)) return true;
        const toMinutes = (time: string) => {
          const [h, m] = time.split(":").map(Number);
          return h * 60 + m;
        };
        for (let i = 0; i < sessions.length; i++) {
          const s1 = sessions[i];
          if (!s1.startTime || !s1.endTime || !s1.day) continue;
          const start1 = toMinutes(s1.startTime);
          const end1 = toMinutes(s1.endTime);
          for (let j = i + 1; j < sessions.length; j++) {
            const s2 = sessions[j];
            if (!s2.startTime || !s2.endTime || s2.day !== s1.day) continue;
            const start2 = toMinutes(s2.startTime);
            const end2 = toMinutes(s2.endTime);
            if (start1 < end2 && start2 < end1) {
              return this.createError({
                path: this.path,
                message: `Sessions ${i + 1} and ${j + 1} on the same day (${
                  s1.day
                }) have overlapping times.`,
              });
            }
          }
        }

        return true;
      }),

    studentIds: Yup.array()
      .of(Yup.string())
      .test(
        "max-capacity",
        "Selected students exceed the maximum capacity",
        function (studentIds) {
          const { maxStudentsCapacity } = this.parent;
          if (!studentIds) return true;
          return studentIds.length <= maxStudentsCapacity;
        }
      ),
  });

export const EventFieldValidations: Record<string, Yup.AnySchema> = {
  title: Yup.string()
    .required("Event title is required")
    .max(255, "Title must be less than 255 characters"),

  description: Yup.string()
    .required("Event description is required")
    .max(1000, "Description must be less than 1000 characters"),

  eventColor: Yup.string().required("Event color is required"),

  eventFor: Yup.string().required("Target audience is required"),

  eventPoster: Yup.mixed().nullable(),
};
// Core function to generate Yup validation schema
const createValidationSchema = (fields: Field[]) => {
    const shape: Record<string, Yup.AnySchema> = {};

    fields.forEach((field) => {
        const rules = field.validationRules;
        let validator: Yup.AnySchema;

        switch (field.type) {
            case 'number':
                let numberValidator = Yup.number().typeError('Must be a number');
                if (rules?.min !== undefined) {
                    numberValidator = numberValidator.min(rules.min, `Minimum value is ${rules.min}`);
                }
                if (rules?.max !== undefined) {
                    numberValidator = numberValidator.max(rules.max, `Maximum value is ${rules.max}`);
                }
                validator = numberValidator;
                break;

            case 'email':
                validator = Yup.string().email('Must be a valid email');
                break;

            case 'phone':
                validator = Yup.string().test(
                    'isValidPhone',
                    'Please enter a valid phone number with the correct country code.',
                    (value) => !value || isValidPhoneNumber(value)
                );
                break;

            case 'file':
                let fileValidator = Yup.mixed<File>();
                if (rules?.maxSize) {
                    fileValidator = fileValidator.test(
                        'fileSize',
                        `File size must be less than ${rules.maxSize / 1024 / 1024}MB`,
                        (file) => !file || file.size <= rules.maxSize!
                    );
                }

                if (rules?.allowedExtensions?.length) {
                    fileValidator = fileValidator.test(
                        'fileType',
                        `Invalid file type. Allowed types: ${rules.allowedExtensions.join(', ')}`,
                        (file) =>
                            !file ||
                            rules.allowedExtensions!.includes(file.name.split('.').pop()?.toLowerCase() || '')
                    );
                }
                validator = fileValidator;
                break;

            case 'date':
                validator = Yup.date().typeError('Must be a valid date');
                break;

            case 'multi-select-checkbox':
                let arrayValidator = Yup.array()
                    .of(Yup.string().required("Each selection is required"));

                if (rules?.minItems) {
                    arrayValidator = arrayValidator.min(rules.minItems, `Select at least ${rules.minItems} items`);
                }

                if (rules?.required) {
                    arrayValidator = arrayValidator.required("This field is required");
                }

                validator = arrayValidator;
                break;
            case 'string-array':
                let itemValidator = Yup.string();

                if (rules?.minLength !== undefined) {
                    itemValidator = itemValidator.min(rules.minLength, `Each item must be at least ${rules.minLength} characters`);
                }

                if (rules?.maxLength !== undefined) {
                    itemValidator = itemValidator.max(rules.maxLength, `Each item must be at most ${rules.maxLength} characters`);
                }

                itemValidator = itemValidator.required("Each item is required");

                let stringArrayValidator = Yup.array().of(itemValidator);

                if (rules?.minItems !== undefined) {
                    stringArrayValidator = stringArrayValidator.min(rules.minItems, `At least ${rules.minItems} items required`);
                }

                if (rules?.maxItems !== undefined) {
                    stringArrayValidator = stringArrayValidator.max(rules.maxItems, `At most ${rules.maxItems} items allowed`);
                }

                if (rules?.required) {
                    stringArrayValidator = stringArrayValidator.required("This field is required");
                }

                validator = stringArrayValidator;
                break;

            default:
                let stringValidator = Yup.string();
                if (rules?.minLength !== undefined) {
                    stringValidator = stringValidator.min(rules.minLength, `Minimum length is ${rules.minLength}`);
                }
                if (rules?.maxLength !== undefined) {
                    stringValidator = stringValidator.max(rules.maxLength, `Maximum length is ${rules.maxLength}`);
                }
                validator = stringValidator;
                break;
        }

        // Apply common rules
        if (rules?.required) {
            validator = validator.required('This field is required');
        }

        // Handle patterns only for string validators
        if (rules?.patterns?.length) {
            if (validator instanceof Yup.string) {
                rules.patterns.forEach((patternRule) => {
                    validator = (validator as Yup.StringSchema).matches(
                        new RegExp(patternRule.regex),
                        patternRule.message || 'Invalid format'
                    );
                });
            }
        }

        if (rules?.matchesField) {
            validator = validator.oneOf(
                [Yup.ref(rules.matchesField.field)],
                rules.matchesField.message || 'Fields must match'
            );
        }
        if (rules?.isAfter?.field && field.type === 'date') {
            validator = (validator as Yup.DateSchema).test(
                'isAfter',
                rules.isAfter.message || `${field.name} must be after ${rules.isAfter.field}`,
                function (value) {
                    const refValue = this.resolve(Yup.ref(rules.isAfter!.field));

                    if (!value || !refValue) return true;

                    const current = new Date(value);
                    const compareTo = new Date(refValue as string | number | Date);

                    return current > compareTo;
                }
            );
        }

        if (rules?.isBefore?.field && field.type === 'date') {
            validator = (validator as Yup.DateSchema).test(
                'isBefore',
                rules.isBefore.message || `${field.name} must be before ${rules.isBefore.field}`,
                function (value) {
                    const refValue = this.resolve(Yup.ref(rules.isBefore!.field));

                    // Ensure both values are valid dates
                    if (!value || !refValue) return true;

                    const current = new Date(value);
                    const compareTo = new Date(refValue as string | number | Date);

                    return current < compareTo;
                }
            );
        }

        shape[field.name] = validator;
    });

    return Yup.object().shape(shape);
};

export default createValidationSchema;