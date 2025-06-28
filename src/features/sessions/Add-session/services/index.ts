import { createFullInfoSchema } from './../validation/schemas';
import type { SessionFormData } from '../types/addsession.types';
import { initialValues } from '../constants/formFields';

export const createSession = async (
  formData: SessionFormData,
  academicPeriods: any[] = []
) => {
    const validationSchema = createFullInfoSchema(academicPeriods);
    await validationSchema.validate(formData, { abortEarly: false });
    return {
      success: true,
      message: 'Session successfully created!',
      sessionId: Math.random().toString(36).substring(2, 9)
    };
};

export const getInitialFormValues = () => {
  return initialValues;
};