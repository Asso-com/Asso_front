import type { Field } from "@/types/formTypes";
import { Box, Flex, Heading } from "@chakra-ui/react";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import { useTranslation } from "react-i18next";

interface FormSectionProps {
  title: string;
  color: string;
  fields: Field[];
  isGuardian?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  color,
  fields,
  isGuardian = false,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Heading
        size="md"
        mb={4}
        color={`${color}.600`}
        display="flex"
        alignItems="center"
        gap={2}
      >
        {t(title)}
        {isGuardian && (
          <Box
            as="span"
            fontSize="sm"
            bg={`${color}.100`}
            color={`${color}.800`}
            px={2}
            py={1}
            borderRadius="md"
          >
            {t("Guardian")}
          </Box>
        )}
      </Heading>
      <Flex direction="column" gap={4}>
        {fields.map((field: Field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Box>
  );
};
export default FormSection;
