import { 
  Card, 
  CardBody, 
  VStack, 
  Text, 
  Divider, 
  Box,
  useColorModeValue,
  Icon,
  HStack
} from "@chakra-ui/react";
import { 
  MdAdminPanelSettings, 
  MdSchool 
} from "react-icons/md";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";

const SummaryCard: React.FC<{
  sessionData: SessionSchuduleDate;
  cardBg?: string;
}> = ({ sessionData, cardBg }) => {
  const defaultBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const dividerColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card 
      bg={cardBg || defaultBg} 
      shadow="md" 
      borderRadius="md" 
      borderColor={useColorModeValue("gray.100", "gray.700")}
      maxW="400px"
      w="full"
    >
      <CardBody p={6}>
        <VStack align="stretch" spacing={5}>
          <Box>
            <HStack spacing={2} align="center" mb={2}>
              <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
                Session Summaries
              </Text>
            </HStack>
          </Box>

          <Divider borderColor={dividerColor} />

          <Box>
            <HStack spacing={2} align="center" mb={3}>
              <Icon as={MdAdminPanelSettings} boxSize={4} color="blue.500" />
              <Text 
                fontSize="md" 
                fontWeight="semibold" 
                color={labelColor}
              >
                Administration Summary
              </Text>
            </HStack>
            <Box
              bg={useColorModeValue("gray.50", "gray.700")}
              p={4}
              borderRadius="lg"
              borderLeft="4px solid"
              borderLeftColor="blue.400"
            >
              <Text 
                fontSize="md" 
                color={textColor}
                lineHeight="1.6"
                whiteSpace="pre-wrap"
              >
                {sessionData.administrationSummary || "No summary available"}
              </Text>
            </Box>
          </Box>
          <Box>
            <HStack spacing={2} align="center" mb={3}>
              <Icon as={MdSchool} boxSize={4} color="green.500" />
              <Text 
                fontSize="md" 
                fontWeight="semibold" 
                color={labelColor}
              >
                Teacher Summary
              </Text>
            </HStack>
            <Box
              bg={useColorModeValue("green.50", "green.900")}
              p={4}
              borderRadius="lg"
              borderLeft="4px solid"
              borderLeftColor="green.400"
            >
              <Text 
                fontSize="md" 
                color={textColor}
                lineHeight="1.6"
                whiteSpace="pre-wrap"
              >
                {sessionData.teacherSummary || "No summary available"}
              </Text>
            </Box>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default SummaryCard;