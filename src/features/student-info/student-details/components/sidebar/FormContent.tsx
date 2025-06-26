import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { Text, Flex, Box, Heading, Radio, RadioGroup, Stack, Select } from '@chakra-ui/react';
import { Formik, type FormikProps } from 'formik';
import { useSelector } from 'react-redux';

import RenderFormBuilder from '@components/shared/form-builder/RenderFormBuilder';
import createValidationSchema from '@utils/createValidationSchema';
import { getDefaultFormValues } from '@utils/getDefaultValueByType';
import { additionalFields, guardianFields, parentFields, studentFields } from '../../constants/StudentFields';
import type { RootState } from '@store/index';
import useFetchStudent from '../../hooks/useFetchStudent';
import useFetchLevel from '@features/Academics/list-level/hooks/useFetchListLevel';
import type { Field } from '@/types/formTypes';

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const [studentOption, setStudentOption] = useState('new');
  const [parentOption, setParentOption] = useState('new');
  const [guardianOption, setGuardianOption] = useState('parent');
  const [existingStudents, setExistingStudents] = useState<{ id: string; name: string }[]>([]);
  const [existingParents, ] = useState([
    { id: '1', name: 'John Doe (Father)' },
    { id: '2', name: 'Jane Smith (Mother)' },
  ]);
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const { data: studentData = [], isLoading: isStudentLoading } = useFetchStudent(associationId);
  const { data: levelData = [], isLoading: isLevelLoading } = useFetchLevel(associationId);
  const foundationLevels = levelData.filter((level: any) => level.categoryName === 'Foundation');

  useEffect(() => {
    if (studentData && Array.isArray(studentData)) {
      const formattedStudents = studentData.map((student: any) => ({
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
      }));
      setExistingStudents(formattedStudents);
    }
  }, [studentData]);

  useEffect(() => { 
    const modifiedParentFields = parentFields.map((field, index) => {
      const isFatherField = field.label.toLowerCase().includes("father's");
      const isMotherField = field.label.toLowerCase().includes("mother's");
      return {
        ...field,
        name: isFatherField
          ? `father_${field.name}_${index}`
          : isMotherField
          ? `mother_${field.name}_${index}`
          : field.name,
      };
    });

    const modifiedGuardianFields = guardianFields.map((field, index) => ({
      ...field,
      name: `guardian_${field.name}_${index}`,
    }));
 
    // Déclarer les champs avec l'assertion 'as Field' pour le typage
    const levelField: Field = {
      name: 'levelId',
      type: 'select',
      label: 'Level',
      validationRules: { required: true },
    };

    const guardianTypeField: Field = {
      name: 'guardian_type',
      type: 'radio',
      label: 'Guardian Type',
      validationRules: { required: true },
    };

    const allFields: Field[] = [
      ...(studentOption === 'new' ? studentFields : []),
      ...(parentOption === 'new' ? modifiedParentFields : []),
      ...(guardianOption === 'other' ? modifiedGuardianFields : []),
      ...additionalFields,
      guardianTypeField,
      levelField,  
    ];

    setInitialValues({
      ...getDefaultFormValues(allFields),
      guardian_type: 'parent',
      levelId: '',  
    });
  }, [studentOption, parentOption, guardianOption]);

  const validationSchema = createValidationSchema([
    ...(studentOption === 'new' ? studentFields : []),
    ...(parentOption === 'new'
      ? parentFields.map((field) => {
          const isFatherField = field.label.toLowerCase().includes("father's");
          const isMotherField = field.label.toLowerCase().includes("mother's");
          return {
            ...field,
            name: isFatherField
              ? `father_${field.name}`
              : isMotherField
              ? `mother_${field.name}`
              : field.name,
          };
        })
      : []),
    ...(guardianOption === 'other'
      ? guardianFields.map((field) => ({
          ...field,
          name: `guardian_${field.name}`,
        }))
      : []),
    ...additionalFields,
    {
      name: 'guardian_type',
      type: 'radio',
      label: 'Guardian Type',
      validationRules: { required: true },
    },
    {
      name: 'levelId',
      type: 'select',
      label: 'Level',
      validationRules: { required: true },
    },
  ]);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;
      await formikRef.current.submitForm();

      if (!formikRef.current.isValid) return null;

      const values = formikRef.current.values;
 
      const formattedData: any = {
        associationId: associationId,
        levelId: values.levelId,
      };
 
      if (studentOption === 'new') {
        formattedData.studentData = {};
        studentFields.forEach((field) => {
          if (values[field.name] !== undefined) {
            formattedData.studentData[field.name] = values[field.name];
          }
        });
      } else {
        formattedData.studentId = values.existingStudentId;
      }
 
      if (parentOption === 'new') {
        formattedData.fatherData = {};
        formattedData.motherData = {};

        parentFields.forEach((field) => {
          const fieldName = field.name;
          const fatherFieldName = `father_${fieldName}`;
          const motherFieldName = `mother_${fieldName}`;
          const fatherValue = values[fatherFieldName];
          const motherValue = values[motherFieldName];

          if (field.label.toLowerCase().includes("father's") && fatherValue !== undefined) {
            formattedData.fatherData[fieldName] = fatherValue;
          } else if (field.label.toLowerCase().includes("mother's") && motherValue !== undefined) {
            formattedData.motherData[fieldName] = motherValue;
          }
        });
 
        formattedData.fatherData.isGuardian = ['father', 'both'].includes(values.guardian_type);
        formattedData.motherData.isGuardian = ['mother', 'both'].includes(values.guardian_type);
        formattedData.fatherData.gender = 'MALE';
        formattedData.motherData.gender = 'FEMALE';
      } else {
        formattedData.fatherId = values.existingParentId;
        formattedData.motherId = values.existingParentId;
      }
 
      if (guardianOption === 'other') {
        formattedData.tutorData = {};
        guardianFields.forEach((field) => {
          const fieldName = field.name;
          const value = values[`guardian_${fieldName}`];
          if (value !== undefined) {
            formattedData.tutorData[fieldName] = value;
          }
        });
        formattedData.tutorData.isGuardian = true;
      }

      return formattedData;
    },
    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm();
        setStudentOption('new');
        setParentOption('new');
        setGuardianOption('parent');
      }
    },
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Flex direction="column" gap={8}> 
          <Box>
            <Heading size="md" mb={4}>Student Selection</Heading>
            <RadioGroup onChange={setStudentOption} value={studentOption} mb={4}>
              <Stack direction="row">
                <Radio value="existing">Select Existing Student</Radio>
                <Radio value="new">Register New Student</Radio>
              </Stack>
            </RadioGroup>

            {studentOption === 'existing' && (
              <Box mb={4}>
                <Select
                  placeholder="Select student"
                  onChange={(e) => setFieldValue('existingStudentId', e.target.value)}
                  isDisabled={isStudentLoading}
                >
                  {existingStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </Select>
                {isStudentLoading && <Text mt={2} color="gray.500">Loading students...</Text>}
              </Box>
            )}
          </Box>
 
          {studentOption === 'new' && (
            <Box>
              <Heading size="md" mb={4}>Student Information</Heading>
              <Flex direction="column" gap={4}>
                {studentFields.map((field) => (
                  <RenderFormBuilder key={field.name} field={field} />
                ))}
              </Flex>
            </Box>
          )}
 
          <Box>
            <Text fontWeight="medium" mb={2}>Level</Text>
            <Select
              placeholder="Select level"
              onChange={(e) => setFieldValue('levelId', e.target.value)}
              isDisabled={isLevelLoading}
              value={values.levelId || ''}
            >
              {foundationLevels.map((level: any) => (
                <option key={level.id} value={level.id}>
                  {level.name} ({level.code})
                </option>
              ))}
            </Select>
            {isLevelLoading && <Text mt={2} color="gray.500">Loading levels...</Text>}
          </Box>
 
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
                <Select
                  placeholder="Select parent"
                  onChange={(e) => setFieldValue('existingParentId', e.target.value)}
                >
                  {existingParents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </Select>
              </Box>
            ) : (
              <Box>
                <Box>
                  <Heading size="sm" mb={2}>Father's Information</Heading>
                  <Flex direction="column" gap={4}>
                    {parentFields
                      .filter((f) => f.label.toLowerCase().includes("father's"))
                      .map((field) => (
                        <RenderFormBuilder
                          key={`father_${field.name}`}
                          field={{
                            ...field,
                            name: `father_${field.name}`,
                          }}
                        />
                      ))}
                  </Flex>
                </Box>

                <Box>
                  <Heading size="sm" mb={2}>Mother's Information</Heading>
                  <Flex direction="column" gap={4}>
                    {parentFields
                      .filter((f) => f.label.toLowerCase().includes("mother's"))
                      .map((field) => (
                        <RenderFormBuilder
                          key={`mother_${field.name}`}
                          field={{
                            ...field,
                            name: `mother_${field.name}`,
                          }}
                        />
                      ))}
                  </Flex>
                </Box>
              </Box>
            )}
          </Box>
 
          <Box>
            <Heading size="md" mb={4}>Guardian Information</Heading>
            <Box mb={4}>
              <Text fontWeight="medium" mb={2}>Who is the guardian?</Text>
              <RadioGroup
                onChange={(value) => {
                  formikRef.current?.setFieldValue('guardian_type', value);
                  setGuardianOption(value);
                }}
                value={values.guardian_type || 'parent'}
              >
                <Stack direction="column">
                  <Radio value="mother">Mother</Radio>
                  <Radio value="father">Father</Radio>
                  <Radio value="both">Both Parents</Radio>
                  <Radio value="other">Other Guardian</Radio>
                </Stack>
              </RadioGroup>
            </Box>

            {guardianOption === 'other' && (
              <Flex direction="column" gap={4} mt={4}>
                {guardianFields.map((field) => (
                  <RenderFormBuilder
                    key={`guardian_${field.name}`}
                    field={{
                      ...field,
                      name: `guardian_${field.name}`,
                    }}
                  />
                ))}
              </Flex>
            )}

            {guardianOption === 'both' && (
              <Text mt={2} color="gray.600">
                Both parents will be designated as guardians.
              </Text>
            )}
          </Box>
 
          <Box>
            <Heading size="md" mb={4}>Additional Information</Heading>
            <Flex direction="column" gap={4}>
              {additionalFields.map((field) => (
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