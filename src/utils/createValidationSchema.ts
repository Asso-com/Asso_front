import * as Yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';
import type { Field } from '../types/formTypes'


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