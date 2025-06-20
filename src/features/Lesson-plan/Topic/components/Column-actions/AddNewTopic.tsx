import React, { useMemo } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Alert,
  AlertIcon,
  Button,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import RenderFormBuilder from '@components/shared/form-builder/RenderFormBuilder';
import FooterActions from '@components/shared/FooterActions';
import createValidationSchema from '@utils/createValidationSchema';
import useUpdateTopics from '../../hooks/useUpdateTopics';
import { useQueryClient } from '@tanstack/react-query';
import type { Field } from '@/types/formTypes';

interface ExtendedField extends Field {
  topicId?: string | number;
}

interface NewTopic {
  id: string;
  description: string;
  sortedOrder: number;
}

interface CreateTopicsProps {
  details?: {
    lessonId: number;
    lessonName: string;
    subjectName?: string;
    levelName?: string;
  };
  associationId: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  topics: NewTopic[];
}

const AddTopics: React.FC<CreateTopicsProps> = ({
  details,
  associationId,
  onClose,
  onSuccess,
}) => {
  // ❗️ Appelle les hooks en haut, avant tout return conditionnel
  const { mutateAsync: updateTopics, isPending } = useUpdateTopics(associationId);
  const queryClient = useQueryClient();

  const bgColor = useColorModeValue('white', 'gray.800');
  const addTopicColor = useColorModeValue('blue.500', 'blue.300');

  const initialValues: FormValues = useMemo(() => ({
    topics: [
      {
        id: `topic-${Date.now()}`,
        description: '',
        sortedOrder: 1,
      },
    ],
  }), []);

  const validationSchema = useMemo(() => {
    const fields: ExtendedField[] = initialValues.topics.map((topic, index) => ({
      name: `topics[${index}].description`,
      type: 'text',
      label: `Topic ${index + 1}`,
      validationRules: {
        required: false,
        minLength: 1,
      },
      placeholder: 'Enter topic description...',
      topicId: topic.id,
    }));
    return createValidationSchema(fields as Field[]);
  }, [initialValues.topics]);

  // ✅ Gère l'erreur après les hooks
  if (!details) {
    return (
      <Box p={4} bg={bgColor} borderRadius="md">
        <Alert status="error">
          <AlertIcon />
          <Text>Unable to load lesson details. Please try again.</Text>
        </Alert>
        <Box mt={4}>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Box>
    );
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const validTopics = values.topics.filter(t => t.description.trim() !== '');
    if (!validTopics.length) {
      setSubmitting(false);
      return;
    }

    try {
      await updateTopics({
        lessonId: details.lessonId,
        topicDescriptions: validTopics.map(t => t.description.trim()),
      });
      queryClient.invalidateQueries({ queryKey: ['topics', associationId] });
      onSuccess();
      onClose();
    } catch {
      // optionally handle error
    } finally {
      setSubmitting(false);
    }
  };

  const createFormFields = (topics: NewTopic[]): ExtendedField[] => {
    return topics.map((topic, index) => ({
      name: `topics[${index}].description`,
      type: 'text',
      label: `Topic ${index + 1}`,
      validationRules: { required: false },
      placeholder: 'Enter topic description...',
      topicId: topic.id,
    }));
  };

  const handleAddTopic = (values: FormValues, setFieldValue: any) => {
    const newTopic: NewTopic = {
      id: `topic-${Date.now()}-${Math.random()}`,
      description: '',
      sortedOrder: values.topics.length + 1,
    };
    setFieldValue('topics', [...values.topics, newTopic]);
  };

  const hasValidTopics = (values: FormValues): boolean => {
    return values.topics.some(t => t.description.trim() !== '');
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="md">
      <VStack spacing={4} align="stretch" mb={4}>
        {details.subjectName && details.levelName && (
          <Text fontSize="sm" color="gray.500">
            {details.levelName} - {details.subjectName}
          </Text>
        )}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">Add topics for this lesson.</Text>
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
              {createFormFields(values.topics).map((field) => (
                <RenderFormBuilder key={`topic-${field.topicId}`} field={field} />
              ))}
            </SimpleGrid>

            <Box mb={4}>
              <Text
                as="button"
                type="button"
                color={addTopicColor}
                fontSize="sm"
                fontWeight="600"
                onClick={() => handleAddTopic(values, setFieldValue)}
                _hover={{ textDecoration: 'underline' }}
              >
                + Add New Topic
              </Text>
            </Box>

            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!hasValidTopics(values) || isSubmitting || isPending}
              isSaving={isSubmitting || isPending}
              cancelText="Cancel"
              saveText="Add Topics"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddTopics;
