export interface PatternRule {
    regex: string;
    message?: string;
}

export interface MatchFieldRule {
    field: string;
    message?: string;
}

export interface CompareDateRule {
    field: string;
    message?: string;
}

export interface ValidationRules {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    maxSize?: number;
    allowedExtensions?: string[];
    required?: boolean;
    patterns?: PatternRule[];
    matchesField?: MatchFieldRule;
    isAfter?: CompareDateRule;
    isBefore?: CompareDateRule;
    email?: boolean;
    minItems?: number;
    maxItems?: number;
}

export type FieldType =
    | 'text'
    | 'number'
    | 'email'
    | 'phone'
    | 'file'
    | 'password'
    | 'date'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'multi-select-checkbox'
    | 'string-array';

export interface Field {
    name: string;
    label: string;
    placeholder?: string;
    inputProps?: any;
    defaultValue?: any;
    type: FieldType;
    validationRules?: ValidationRules;
    options?: { label: string; value: any }[];
}
