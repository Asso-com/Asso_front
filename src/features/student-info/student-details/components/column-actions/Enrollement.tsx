import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

// interface EnrollementProps {
//   onClose: () => void;
// }

const Enrollement: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box p={4}>
      <Text fontSize="lg" fontWeight="medium" mb={4}>
        {t("Coming Soon")}
      </Text>
      {/* <Flex justify="flex-end">
        <Button onClick={onClose} colorScheme="blue">
          {t("Close")}
        </Button> 
      </Flex>*/}
    </Box>
  );
};

export default Enrollement;
