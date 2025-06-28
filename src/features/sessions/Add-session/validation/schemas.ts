import * as Yup from 'yup';
import { validateDateWithinAcademicPeriods } from './validators';

export const createFullInfoSchema = (academicPeriods: any[] = []) => {
  return Yup.object({
    generalLevels: Yup.string().required('Category is required'),
    levelSubjectId: Yup.number().required('Subject level is required'),
    staffId: Yup.string().required('Teacher is required'),
    periodicity: Yup.string().required('Periodicity is required'),
    sessionType: Yup.string().required('Session type is required'),
    startDate: Yup.string()
      .required('Start date is required')
      .test(
        'within-academic-period',
        'Start date must be within the active academic period',
        validateDateWithinAcademicPeriods(academicPeriods)
      ),
    endDate: Yup.string()
      .required('End date is required')
      .test(
        'within-academic-period',
        'End date must be within the active academic period',
        validateDateWithinAcademicPeriods(academicPeriods)
      )
      .test(
        'after-start-date',
        'End date must be after start date',
        function (value) {
          const { startDate } = this.parent;
          if (!startDate || !value) return true;
          return new Date(value) > new Date(startDate);
        }
      ),
    maxStudentsCapacity: Yup.number().min(1, 'Capacity must be at least 1').required('Capacity is required'),
    fees: Yup.number().min(0, 'Fees cannot be negative').required('Fees is required'),
  });
};
