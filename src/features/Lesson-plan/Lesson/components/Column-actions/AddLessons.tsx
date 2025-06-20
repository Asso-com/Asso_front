import React, { useMemo, useCallback } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import RenderFormBuilder from '@components/shared/form-builder/RenderFormBuilder';
import FooterActions from '@components/shared/FooterActions';
import createValidationSchema from '@utils/createValidationSchema';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateLessons from '../../hooks/useUpdateLessons';
import type { Field } from '@/types/formTypes';

interface ExtendedField extends Field {
  lessonId?: string | number;
}

interface Lesson {
  id: string;
  name: string;
  sortedOrder: number;
}

interface CreateLessonsProps {
  details: {
    levelSubjectId: number;
    lessons: Lesson[];
    subjectName: string;
  };
  associationId: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  lessons: Lesson[];
}

const AddLessons: React.FC<CreateLessonsProps> = ({
  details,
  associationId,
  onClose,
  onSuccess,
}) => {
  const { mutateAsync: createLessons, isPending } = useUpdateLessons(associationId);
  const queryClient = useQueryClient();
  const bgColor = useColorModeValue('white', 'gray.800');
  const addLessonColor = useColorModeValue('green.500', 'green.300');

  const initialValues: FormValues = useMemo(() => ({
    lessons: [
      {
        id: `lesson-${Date.now()}`,
        name: '',
        sortedOrder: 1,
      },
    ],
  }), []);

  const validationSchema = useMemo(() => {
    const fields: ExtendedField[] = initialValues.lessons.map((lesson, index) => ({
      name: `lessons[${index}].name`,
      type: 'text',
      label: `Lesson ${index + 1}`,
      validationRules: {
        required: false,
        minLength: 1,
      },
      placeholder: 'Enter lesson name...',
      lessonId: lesson.id,
    }));
    return createValidationSchema(fields as Field[]);
  }, [initialValues.lessons]);

  const onSubmit = useCallback(async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const validLessons = values.lessons.filter(l => l.name.trim() !== '');
    if (!validLessons.length) {
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        levelSubjectId: details.levelSubjectId,
        lessonNames: validLessons.map(l => l.name.trim()),
      };
      await createLessons(payload);
      await queryClient.invalidateQueries({ queryKey: ['lessons', associationId] });
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }, [details.levelSubjectId, createLessons, queryClient, associationId, onSuccess, onClose]);

  const createFormFields = (lessons: Lesson[]): ExtendedField[] => {
    return lessons.map((lesson, index) => ({
      name: `lessons[${index}].name`,
      type: 'text',
      label: `Lesson ${index + 1}`,
      validationRules: { required: false },
      placeholder: 'Enter lesson name...',
      lessonId: lesson.id,
    }));
  };

  const handleAddLesson = (values: FormValues, setFieldValue: any) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}-${Math.random()}`,
      name: '',
      sortedOrder: values.lessons.length + 1,
    };
    setFieldValue('lessons', [...values.lessons, newLesson]);
  };

  const hasValidLessons = useCallback((values: FormValues): boolean => {
    return values.lessons.some(l => l.name.trim() !== '');
  }, []);

  return (
    <Box p={4} bg={bgColor} borderRadius="md">
      <VStack spacing={4} align="stretch" mb={4}>
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">Add lessons for this subject-level association.</Text>
        </Alert>
      </VStack>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit, values, setFieldValue }) => (
          <Form>
            <SimpleGrid columns={1} spacing={4} mb={4}>
              {createFormFields(values.lessons).map((field) => (
                <RenderFormBuilder key={`lesson-${field.lessonId}`} field={field} />
              ))}
            </SimpleGrid>

            <Box mb={4}>
              <Text
                as="button"
                type="button"
                color={addLessonColor}
                fontSize="sm"
                fontWeight="600"
                onClick={() => handleAddLesson(values, setFieldValue)}
                _hover={{ textDecoration: 'underline' }}
              >
                + Add New Lesson
              </Text>
            </Box>

            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!hasValidLessons(values) || isSubmitting || isPending}
              isSaving={isSubmitting || isPending}
              cancelText="Cancel"
              saveText="Create Lessons"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddLessons;
