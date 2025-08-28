import React, { useMemo } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Alert,
  HStack,
  AlertIcon,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import RenderFormBuilder from '@components/shared/form-builder/RenderFormBuilder';
import FooterActions from '@components/shared/FooterActions';
import createValidationSchema from '@utils/createValidationSchema';
import useReorderAndUpdateLesson from '../../hooks/useReorderAndUpdateLesson';
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
  lessons: Lesson[];
}

interface DroppableAreaProps {
  provided: any;
  snapshot: any;
  formFields: ExtendedField[];
  bgColor: string;
  borderColor: string;
  dragOverBg: string;
  dragHandleColor: string;
  textColor: string;
}

const LessonItem: React.FC<{
  field: ExtendedField;
  provided: any;
  snapshot: any;
  bgColor: string;
  borderColor: string;
  dragOverBg: string;
  dragHandleColor: string;
  textColor: string;
}> = ({ field, provided, snapshot, bgColor, borderColor, dragOverBg, dragHandleColor, textColor }) => (
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
      <RenderFormBuilder field={field} />
    </HStack>
  </Box>
);

const DraggableLesson: React.FC<{
  field: ExtendedField;
  index: number;
  bgColor: string;
  borderColor: string;
  dragOverBg: string;
  dragHandleColor: string;
  textColor: string;
}> = ({ field, index, bgColor, borderColor, dragOverBg, dragHandleColor, textColor }) => (
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

const DroppableArea: React.FC<DroppableAreaProps> = ({
  provided,
  snapshot,
  formFields,
  bgColor,
  borderColor,
  dragOverBg,
  dragHandleColor,
  textColor,
}) => (
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
    {formFields.map((field, index) => (
      <DraggableLesson
        key={`lesson-${field.lessonId}`}
        field={field}
        index={index}
        bgColor={bgColor}
        borderColor={borderColor}
        dragOverBg={dragOverBg}
        dragHandleColor={dragHandleColor}
        textColor={textColor}
      />
    ))}
    {provided.placeholder}
  </SimpleGrid>
);

const EditLessons: React.FC<EditLessonsProps> = ({
  details,
  associationId,
  onClose,
  onSuccess,
}) => {
  const { mutateAsync: updateLessons, isPending } = useReorderAndUpdateLesson(associationId);

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const dragOverBg = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const dragHandleColor = useColorModeValue('gray.500', 'gray.400');

  const initialValues: FormValues = useMemo(() => ({
    lessons: [...details.lessons].sort((a, b) => a.sortedOrder - b.sortedOrder),
  }), [details.lessons]);

  const validationSchema = useMemo(() => {
    const fields: ExtendedField[] = initialValues.lessons.map((lesson, index) => ({
      name: `lessons[${index}].name`,
      type: 'text',
      label: `Lesson ${index + 1}`,
      validationRules: { required: false },
      placeholder: 'Enter lesson name...',
      isDraggable: true,
      lessonId: lesson.id,
    }));
    return createValidationSchema(fields as Field[]);
  }, [initialValues.lessons]);

  const createFormFields = (lessons: Lesson[]): ExtendedField[] => {
    return lessons.map((lesson, index) => ({
      name: `lessons[${index}].name`,
      type: 'text',
      label: `Lesson ${index + 1}`,
      validationRules: { required: false },
      placeholder: 'Enter lesson name...',
      isDraggable: true,
      lessonId: lesson.id,
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

  const hasChanges = (values: FormValues): boolean => {
    const currentLessons = values.lessons.filter(l => l.name.trim() !== '');
    
    if (currentLessons.length !== initialValues.lessons.length) return true;

    return currentLessons.some((lesson, index) => {
      const original = initialValues.lessons[index];
      return (
        !original ||
        lesson.name.trim() !== original.name.trim() ||
        lesson.sortedOrder !== original.sortedOrder
      );
    });
  };

 const onSubmit = async (
  values: FormValues,
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  try {
    const validLessons = values.lessons.filter(l => l.name.trim() !== '');
    if (!validLessons.length) return;

    const payload = validLessons.map((lesson) => ({
      id: Number(lesson.id),
      name: lesson.name.trim(),
      sortedOrder: lesson.sortedOrder,
    }));

    await updateLessons(payload);
    onSuccess();
    onClose();
  } catch (error) {
    console.error('Failed to update lessons', error);
  } finally {
    setSubmitting(false);
  }
};


  const renderDragDropContent = (
    values: FormValues,
    setFieldValue: any,
    formFields: ExtendedField[]
  ) => (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result, values, setFieldValue)}>
      <Droppable droppableId={`lessons-${details.levelSubjectId}`}>
        {(provided, snapshot) => (
          <DroppableArea
            provided={provided}
            snapshot={snapshot}
            formFields={formFields}
            bgColor={bgColor}
            borderColor={borderColor}
            dragOverBg={dragOverBg}
            dragHandleColor={dragHandleColor}
            textColor={textColor}
          />
        )}
      </Droppable>
    </DragDropContext>
  );

  return (
    <Box p={4} bg={bgColor} borderRadius="md">
      <VStack spacing={4} align="stretch" mb={4}>
        <Text fontSize="lg" fontWeight="600" color={textColor}>
          Edit Lessons for {details.subjectName}
        </Text>
        <Alert status="info" borderRadius="md" bg={dragOverBg}>
          <AlertIcon />
          <Text fontSize="sm">Drag lessons to reorder them.</Text>
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
              {renderDragDropContent(values, setFieldValue, formFields)}
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