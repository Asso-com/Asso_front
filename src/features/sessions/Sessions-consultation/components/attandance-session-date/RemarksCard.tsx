import { Card, CardBody, VStack, Text } from "@chakra-ui/react";
import GenericInput from "@components/shared/inputs/GenericInput";

const RemarksCard: React.FC<{ cardBg: string }> = ({ cardBg }) => (
  <Card bg={cardBg} shadow="md" borderRadius="md" flex={1}>
    <CardBody>
      <VStack align="start" spacing={3} h="100%">
        <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
          Session Remarks
        </Text>

        <VStack spacing={3} width="100%" flex={1}>
          <GenericInput
            label="Administration Remarque"
            placeholder="Enter administration remarks..."
            size="sm"
            resize="vertical"
            minH="80px"
            borderColor="blue.200"
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
            name="adminRemark"
          />

          <GenericInput
            label="Professor Remarque"
            placeholder="Enter professor remarks..."
            size="sm"
            resize="vertical"
            minH="80px"
            borderColor="green.200"
            _focus={{
              borderColor: "green.500",
              boxShadow: "0 0 0 1px green.500",
            }}
            name="profRemark"
          />
        </VStack>
      </VStack>
    </CardBody>
  </Card>
);
export default RemarksCard;
