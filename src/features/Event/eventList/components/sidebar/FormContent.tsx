import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import EventFormFields from "../../constants/EventFields";
import type { EventFormValues } from "../../types/event.types";

export type FormContentRef = {
  submitForm: () => Promise<EventFormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const formikRef = useRef<FormikProps<EventFormValues>>(null);
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const initialValues: EventFormValues = {
    title: "",
    description: "",
    associationId: 0,
    startDate: "",
    endDate: "",
    eventType: "TASK",
    eventColor: "#3182ce",
    sessionId: undefined,
    eventPoster: undefined,
  };

  const validationSchema = useMemo(() => {
    return createValidationSchema(EventFormFields);
  }, []);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;

      await formikRef.current.submitForm();

      const { isValid, dirty, values } = formikRef.current;
      if (isValid && dirty) {
        return {
          ...values,
          associationId,
        };
      }

      return null;
    },

    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    },
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {() => (
        <Flex direction="column" gap={4}>
          {EventFormFields.map((field) => (
            <RenderFormBuilder key={field.name} field={field} />
          ))}
        </Flex>
      )}
    </Formik>
  );
});

export default FormContent;
