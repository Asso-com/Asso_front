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
  Button,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import RenderFormBuilder from '@components/shared/form-builder/RenderFormBuilder';
import FooterActions from '@components/shared/FooterActions';
import createValidationSchema from '@utils/createValidationSchema';
import useUpdateTopics from '../../hooks/useUpdateTopics';
import { useQueryClient } from '@tanstack/react-query';
import type { Field } from '@/types/formTypes';

interface ExtendedField extends Field {
  isDraggable?: boolean;
  topicId?: string | number;
}

interface Topic {
  id: number | string;
  description: string;
  sortedOrder: number;
}

interface EditableTopic extends Topic {
  isNew?: boolean;
}

interface EditTopicsProps {
  details: {
    lessonId: number;
    topics: Topic[];
    lessonName: string;
    subjectName?: string;
    levelName?: string;
  };
  associationId: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  topics: EditableTopic[];
}

interface TopicItemProps {
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

const TopicItem: React.FC<TopicItemProps> = ({
  field,
  provided,
  snapshot,
  bgColor,
  borderColor,
  dragOverBg,
  dragHandleColor,
  textColor,
  onRemove,
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

const EditTopics: React.FC<EditTopicsProps> = ({
  details,
  associationId,
  onClose,
  onSuccess,
}) => {
  const { mutateAsync: updateTopics, isPending } = useUpdateTopics(associationId);
  const queryClient = useQueryClient();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const dragOverBg = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const dragHandleColor = useColorModeValue('gray.500', 'gray.400');

  const initialValues: FormValues = useMemo(() => ({
    topics: [...details.topics]
      .sort((a, b) => a.sortedOrder - b.sortedOrder)
      .map((topic, index) => ({
        ...topic,
        sortedOrder: index + 1,
        isNew: false,
      })),
  }), [details.topics]);

  const validationSchema = useMemo(() => {
    const fields: ExtendedField[] = initialValues.topics.map((topic, index) => ({
      name: `topics[${index}].description`,
      type: 'text',
      label: `Topic ${index + 1}`,
      validationRules: {
        required: false,
        minLength: topic.description.trim() ? 1 : 0,
      },
      placeholder: 'Enter topic description...',
      isDraggable: true,
      topicId: topic.id,
    }));
    return createValidationSchema(fields as Field[]);
  }, [initialValues.topics]);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const validTopics = values.topics.filter(t => t.description.trim() !== '');
      if (!validTopics.length) return;

      const payload = {
        lessonId: details.lessonId,
        topicDescriptions: validTopics.map(t => t.description.trim()), // Match backend expectation
      };

      await updateTopics(payload);
      queryClient.invalidateQueries({ queryKey: ['topics', associationId] });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to update topics', error);
    } finally {
      setSubmitting(false);
    }
  };

  const createFormFields = (topics: EditableTopic[]): ExtendedField[] => {
    return topics.map((topic, index) => ({
      name: `topics[${index}].description`,
      type: 'text',
      label: `Topic ${index + 1}`,
      validationRules: { required: false },
      placeholder: 'Enter topic description...',
      isDraggable: true,
      topicId: topic.id,
    }));
  };

  const handleDragEnd = (result: DropResult, values: FormValues, setFieldValue: any) => {
    if (!result.destination) return;

    const items = [...values.topics];
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      sortedOrder: index + 1,
    }));

    setFieldValue('topics', updatedItems);
  };

  const hasChanges = (values: FormValues): boolean => {
    const currentTopics = values.topics.filter(t => t.description.trim() !== '');
    const originalTopics = initialValues.topics;

    if (currentTopics.length !== originalTopics.length) return true;

    return currentTopics.some((topic, index) => {
      const original = originalTopics[index];
      return (
        !original ||
        topic.description.trim() !== original.description.trim() ||
        topic.sortedOrder !== original.sortedOrder
      );
    });
  };

  const renderDraggableTopic = (field: ExtendedField, index: number) => (
    <Draggable
      key={`topic-${field.topicId}`}
      draggableId={`topic-${field.topicId}`}
      index={index}
    >
      {(provided, snapshot) => (
        <TopicItem
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
          Edit Topics for {details.lessonName}
          {details.subjectName && details.levelName && (
            <Text fontSize="sm" color="gray.500" mt={1}>
              {details.levelName} - {details.subjectName}
            </Text>
          )}
        </Text>
        <Alert status="info" borderRadius="md" bg={dragOverBg}>
          <AlertIcon />
          <Text fontSize="sm">
            Drag topics to reorder them.
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
          const formFields = createFormFields(values.topics);

          return (
            <Form>
              <DragDropContext onDragEnd={(result) => handleDragEnd(result, values, setFieldValue)}>
                <Droppable droppableId={`topics-${details.lessonId}`}>
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
                      {formFields.map((field, index) => renderDraggableTopic(field, index))}
                      {provided.placeholder}
                    </SimpleGrid>
                  )}
                </Droppable>
              </DragDropContext>

              <FooterActions
                onClose={onClose}
                handleSave={handleSubmit}
                isDisabled={!hasChanges(values) || isSubmitting || isPending}
                isSaving={isSubmitting || isPending}
                cancelText="Cancel"
                saveText="Update Topics"
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditTopics;