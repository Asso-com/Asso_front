import React from "react";
import { 
  Button,
  Drawer,
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerOverlay, 
  useDisclosure,
  Box 
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import CoefficientServiceApi from "../../services/CoefficientServiceApi";
import type { RootState } from "@store/index";
import CoefficientFields from "../constants/CoefficientFields";

const CoefficientSidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);

  // Définition des valeurs initiales
  const initialValues = {
    assiduity_coefficient: "",
    participation_coefficient: "",
    quiz_coefficient: "",
    delay_before_attendance: ""
  };

  // Schéma de validation
  const validationSchema = createValidationSchema(CoefficientFields);

  const { mutate: createCoefficient, isPending } = useMutation({
    mutationFn: (values: any) => {
      console.log("Submitting data:", values);
      const dataWithAssociationId = {
        ...values,
        association_id: associationId,
      };
      return CoefficientServiceApi.create(dataWithAssociationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coefficients', associationId] });
      toast({
        title: t("Success"),
        description: t("Coefficient added successfully"),
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      toast({
        title: t("Error"),
        description: error.message || t("Failed to add coefficient"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const handleSubmitForm = async (values: any) => {
    console.log("Form values:", values);
    try {
      await createCoefficient(values);
    } catch (error: any) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {/* Bouton "Add Coefficient" */}
      <Button
   size="md"
        fontSize="sm"
        variant="outline"
        colorScheme="primary"
        
        onClick={onOpen}
        
      >
        {t("Add Coefficient")}
      </Button>
      
      <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" bg="#335a94" color="white">
            {t("Add New Coefficient")}
          </DrawerHeader>

          <DrawerBody>
            <Box pt={4}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmitForm}
              >
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* Champs du formulaire avec validation */}
                    {CoefficientFields.map((field) => (
                      <RenderFormBuilder key={field.name} field={field} />
                    ))}
                    
                    {/* Boutons Cancel et Submit dans le drawer - STYLE ORIGINAL */}
                    <DrawerFooter borderTopWidth="1px" mt={6}>
                      <Button variant="outline" mr={3} onClick={onClose}>
                        {t("Cancel")}
                      </Button>
                      <Button 
                        colorScheme="blue" 
                        isLoading={isPending || isSubmitting}
                        isDisabled={!isValid || !dirty}
                        onClick={() => handleSubmit()}
                      >
                        {t("Submit")}
                      </Button>
                    </DrawerFooter>
                  </Form>
                )}
              </Formik>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CoefficientSidebar;