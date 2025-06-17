import React, { useState, useMemo } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Alert,
  HStack,
  AlertIcon,
  Button,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import RenderFormBuilder from '@components/shared/form-builder/RenderFormBuilder';
import FooterActions from '@components/shared/FooterActions';
import createValidationSchema from '@utils/createValidationSchema';
import useUpdateLessons from '../../hooks/useUpdateLessons';
import type { Field } from '@/types/formTypes';

interface ExtendedField extends Field {
  isDraggable?: boolean;
  lessonId?: string | number;
}

interface Lesson {
  id: number | string;
  name: string;
  sortedOrder: number;
}

interface EditableLesson extends Lesson {
  id: number | string;
  isNew?: boolean;
}

interface EditLessonsProps {
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
  lessons: EditableLesson[];
}

interface LessonItemProps {
  field: ExtendedField;
  provided: any;
  snapshot: any;
  bgColor: string;
  borderColor: string;
  dragOverBg: string;
  dragHandleColor: string;
  textColor: string;
  onRemove?: () => void;
}

// Moved LessonItem outside of parent component and fixed type intersection
const LessonItem: React.FC<LessonItemProps> = ({ 
  field, 
  provided, 
  snapshot, 
  bgColor, 
  borderColor, 
  dragOverBg, 
  dragHandleColor, 
  textColor,
  onRemove 
}) => (
  <Box
    ref={provided.innerRef}
    {...provided.draggableProps}
    bg={snapshot.isDragging ? dragOverBg : bgColor}
    borderWidth="1px"
    borderColor={borderColor}
    borderRadius="md"
    p={3}
    shadow={snapshot.isDragging ? 'lg' : 'sm'}
    transition="all 0.2s ease"
  >
    <HStack spacing={3}>
      <Box
        {...provided.dragHandleProps}
        cursor="grab"
        userSelect="none"
        color={dragHandleColor}
        _hover={{ color: textColor }}
        _active={{ cursor: 'grabbing' }}
      >
        <Text fontSize="lg">☰</Text>
      </Box>
      <RenderFormBuilder key={field.name} field={field} />
      {onRemove && (
        <Button size="sm" colorScheme="red" onClick={onRemove}>
          Remove
        </Button>
      )}
    </HStack>
  </Box>
);

const EditLessons: React.FC<EditLessonsProps> = ({
  details,
  associationId,
  onClose,
  onSuccess,
}) => {
  const [newLessonCounter, setNewLessonCounter] = useState(1);
  const { mutateAsync: updateLessons, isPending } = useUpdateLessons(associationId);

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const dragOverBg = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const addLessonColor = useColorModeValue('blue.500', 'blue.300');
  const dragHandleColor = useColorModeValue('gray.500', 'gray.400');

  const initialValues: FormValues = useMemo(() => ({
    lessons: [...details.lessons]
      .sort((a, b) => a.sortedOrder - b.sortedOrder)
      .map((lesson, index) => ({
        ...lesson,
        sortedOrder: index + 1,
        isNew: false,
      })),
  }), [details.lessons]);

  const validationSchema = useMemo(() => {
    const fields: ExtendedField[] = initialValues.lessons.map((lesson, index) => ({
      name: `lessons[${index}].name`,
      type: 'text',
      label: `Lesson ${index + 1}`,
      validationRules: {
        required: false,
        minLength: lesson.name.trim() ? 1 : 0,
      },
      placeholder: 'Enter lesson name...',
      isDraggable: true,
      lessonId: lesson.id ?? `new-${index}`,
    }));
    return createValidationSchema(fields as Field[]);
  }, [initialValues.lessons]);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const validLessons = values.lessons.filter(l => l.name.trim() !== '');
      if (!validLessons.length) return;

      const payload = {
        levelSubjectId: details.levelSubjectId,
        lessonNames: validLessons.map(l => l.name.trim()),
      };

      await updateLessons(payload);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to update lessons', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Extracted helper functions to reduce nesting
  const createFormFields = (lessons: EditableLesson[]): ExtendedField[] => {
    return lessons.map((lesson, index) => ({
      name: `lessons[${index}].name`,
      type: 'text',
      label: `Lesson ${index + 1}`,
      validationRules: { required: false },
      placeholder: 'Enter lesson name...',
      isDraggable: true,
      lessonId: lesson.id ?? `new-${index}`,
    }));
  };

  const handleDragEnd = (result: DropResult, values: FormValues, setFieldValue: any) => {
    if (!result.destination) return;

    const items = [...values.lessons];
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      sortedOrder: index + 1,
    }));

    setFieldValue('lessons', updatedItems);
  };

  const handleAddLesson = (values: FormValues, setFieldValue: any) => {
    const newLesson: EditableLesson = {
      id: `new-${newLessonCounter}`,
      name: '',
      sortedOrder: values.lessons.length + 1,
      isNew: true,
    };
    setFieldValue('lessons', [...values.lessons, newLesson]);
    setNewLessonCounter(prev => prev + 1);
  };

  const hasChanges = (values: FormValues): boolean => {
    const currentLessons = values.lessons.filter(l => l.name.trim() !== '');
    const originalLessons = initialValues.lessons;

    if (currentLessons.length !== originalLessons.length) return true;

    return currentLessons.some((lesson, index) => {
      const original = originalLessons[index];
      return (
        !original ||
        lesson.name.trim() !== original.name.trim() ||
        lesson.sortedOrder !== original.sortedOrder
      );
    });
  };

  const renderDraggableLesson = (field: ExtendedField, index: number) => (
    <Draggable
      key={`lesson-${field.lessonId}`}
      draggableId={`lesson-${field.lessonId}`}
      index={index}
    >
      {(provided, snapshot) => (
        <LessonItem
          field={field}
          provided={provided}
          snapshot={snapshot}
          bgColor={bgColor}
          borderColor={borderColor}
          dragOverBg={dragOverBg}
          dragHandleColor={dragHandleColor}
          textColor={textColor}
        />
      )}
    </Draggable>
  );

  return (
    <Box p={4} bg={bgColor} borderRadius="md">
      <VStack spacing={4} align="stretch" mb={4}>
        <Text fontSize="lg" fontWeight="600" color={textColor}>
          Edit Lessons for {details.subjectName}
        </Text>
        <Alert status="info" borderRadius="md" bg={dragOverBg}>
          <AlertIcon />
          <Text fontSize="sm">
            Drag lessons to reorder, edit names, or add new ones. Empty lessons will be removed on save.
          </Text>
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
        {({ isSubmitting, handleSubmit, values, setFieldValue }) => {
          const formFields = createFormFields(values.lessons);

          return (
            <Form>
              <DragDropContext onDragEnd={(result) => handleDragEnd(result, values, setFieldValue)}>
                <Droppable droppableId={`lessons-${details.levelSubjectId}`}>
                  {(provided, snapshot) => (
                    <SimpleGrid
                      columns={1}
                      spacing={4}
                      mb={4}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      bg={snapshot.isDraggingOver ? dragOverBg : 'transparent'}
                      p={snapshot.isDraggingOver ? 2 : 0}
                      borderRadius="md"
                    >
                      {formFields.map((field, index) => renderDraggableLesson(field, index))}
                      {provided.placeholder}
                    </SimpleGrid>
                  )}
                </Droppable>
              </DragDropContext>

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
                isDisabled={!hasChanges(values) || isSubmitting || isPending}
                isSaving={isSubmitting || isPending}
                cancelText="Cancel"
                saveText="Update Lessons"
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditLessons;