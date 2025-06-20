import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import {Text, Flex, Box, Heading, Radio, RadioGroup, Stack, Select } from '@chakra-ui/react';
import { Formik, type FormikProps } from 'formik';

import RenderFormBuilder from '@components/shared/form-builder/RenderFormBuilder';
import createValidationSchema from '@utils/createValidationSchema';
import { getDefaultFormValues } from '@utils/getDefaultValueByType';
import { additionalFields, guardianFields, parentFields, studentFields } from '../../constants/StudentFields';
 

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const [parentOption, setParentOption] = useState('new');
  const [guardianOption, setGuardianOption] = useState('parent');
  const [existingParents, setExistingParents] = useState([
    { id: '1', name: 'John Doe (Father)' },
    { id: '2', name: 'Jane Smith (Mother)' },
  ]);
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const formikRef = useRef<FormikProps<FormValues>>(null);

  useEffect(() => {
    const allFields = [
      ...studentFields,
      ...(parentOption === 'new' ? parentFields : []),
      ...(guardianOption === 'other' ? guardianFields : []),
      ...additionalFields
    ];
    setInitialValues(getDefaultFormValues(allFields));
  }, [parentOption, guardianOption]);

  const validationSchema = createValidationSchema([
    ...studentFields,
    ...(parentOption === 'new' ? parentFields : []),
    ...(guardianOption === 'other' ? guardianFields : []),
    ...additionalFields
  ]);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;
      await formikRef.current.submitForm();
      return formikRef.current.isValid ? formikRef.current.values : null;
    },
    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm();
        setParentOption('new');
        setGuardianOption('parent');
      }
    }
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Flex direction="column" gap={8}>
          {/* Student Information Section */}
          <Box>
            <Heading size="md" mb={4}>Student Information</Heading>
            <Flex direction="column" gap={4}>
              {studentFields.map(field => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </Flex>
          </Box>

          {/* Parents Information Section */}
          <Box>
            <Heading size="md" mb={4}>Parents Information</Heading>
            <RadioGroup onChange={setParentOption} value={parentOption} mb={4}>
              <Stack direction="row">
                <Radio value="existing">Select Existing Parent</Radio>
                <Radio value="new">Register New Parent</Radio>
              </Stack>
            </RadioGroup>

            {parentOption === 'existing' ? (
              <Box mb={4}>
                <Select placeholder="Select parent">
                  {existingParents.map(parent => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </Select>
              </Box>
            ) : (
              <Flex direction="column" gap={4}>
                <Box>
                  <Heading size="sm" mb={2}>Father's Information</Heading>
                  <Flex direction="column" gap={4}>
                    {parentFields
                      .filter(f => f.name.startsWith('father_'))
                      .map(field => (
                        <RenderFormBuilder key={field.name} field={field} />
                      ))}
                  </Flex>
                </Box>

                <Box>
                  <Heading size="sm" mb={2}>Mother's Information</Heading>
                  <Flex direction="column" gap={4}>
                    {parentFields
                      .filter(f => f.name.startsWith('mother_'))
                      .map(field => (
                        <RenderFormBuilder key={field.name} field={field} />
                      ))}
                  </Flex>
                </Box>
              </Flex>
            )}
          </Box>

          {/* Guardian Information Section */}
          {/* Guardian Information Section */}
<Box>
  <Heading size="md" mb={4}>Guardian Information</Heading>
  
  <Box mb={4}>
    <Text fontWeight="medium" mb={2}>Who is the guardian?</Text>
    <RadioGroup 
      onChange={(value) => {
        formikRef.current?.setFieldValue('guardian_type', value);
        setGuardianOption(value);
      }} 
      value={values.guardian_type || ''}
    >
      <Stack direction="column">
        <Radio value="mother">Mother</Radio>
        <Radio value="father">Father</Radio>
        <Radio value="both">Both Parents</Radio>
        <Radio value="other">Other Guardian</Radio>
      </Stack>
    </RadioGroup>
  </Box>

  {values.guardian_type === 'other' && (
    <Flex direction="column" gap={4} mt={4}>
      {guardianFields
        .filter(field => !['guardian_type'].includes(field.name))
        .map(field => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
    </Flex>
  )}

  {values.guardian_type === 'both' && (<Text mt={2} color="gray.600">Both parents will be designated as guardians.</Text>
  )}
</Box>

          {/* Additional Information Section */}
          <Box>
            <Heading size="md" mb={4}>Additional Information</Heading>
            <Flex direction="column" gap={4}>
              {additionalFields.map(field => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </Flex>
          </Box>
        </Flex>
      )}
    </Formik>
  );
});

export default FormContent;