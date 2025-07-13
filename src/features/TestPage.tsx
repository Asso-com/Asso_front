import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Code,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  convertLocalToUTC,
  convertUTCToLocalDisplay,
  formatDateForInput,
  getUserTimezone,
} from "@utils/timeUtils";

const TestPage = () => {
  const [localDateTime, setLocalDateTime] = useState<string>("");

  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalDateTime(event.target.value);
  };

  const currentDate = new Date();
  const currentDateForInput = formatDateForInput(currentDate);

  const shudule = {
    id: 1,
    scheduleTemplateId: 1,
    title: "schedule 1",
    meetingDate: "2024-01-15", 
    localTime: "09:00:00",
    timezone: "America/Nassau",
  };

  const userTimezone = getUserTimezone();

  //Convert original schedule  UTC ISO
  const parisDateTimeISO = convertLocalToUTC(
    `${shudule.meetingDate}T${shudule.localTime}`,
    "iso",
    shudule.timezone
  );

  const userView = convertUTCToLocalDisplay(parisDateTimeISO, {
    format: "full",
    timeZone: userTimezone,
  });

  return (
    <Box w="100%" mx="auto" p={4} bg={"white"} borderRadius="md">
      <VStack spacing={4} align="stretch">
        <Box p={4}>
          <Input
            type="datetime-local"
            value={localDateTime || currentDateForInput}
            onChange={handleDateTimeChange}
            bg="white"
            borderColor={borderColor}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
          />

          {localDateTime && (
            <Box
              mt={4}
              p={3}
              bg="white"
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <VStack align="start" spacing={3}>
                <Text fontSize="sm" color="gray.600">
                  <Text as="span" fontWeight="bold">
                    Local Input:
                  </Text>{" "}
                  {localDateTime}
                </Text>

                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Display (Local):
                  </Text>{" "}
                  {convertUTCToLocalDisplay(localDateTime, {
                    format: "medium",
                  })}
                </Text>

                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Send to Backend (ISO UTC):
                  </Text>{" "}
                  <Code fontSize="sm" colorScheme="green">
                    {convertLocalToUTC(localDateTime, "iso")}
                  </Code>
                </Text>
              </VStack>
            </Box>
          )}

          <Box
            mt={8}
            p={4}

          >
            <Text fontSize="md">
              <Text as="span" fontWeight="bold">
                Original Time ({shudule.timezone}):
              </Text>{" "}
              {`${shudule.meetingDate} ${shudule.localTime}`}
            </Text>

            <Text fontSize="md">
              <Text as="span" fontWeight="bold">
                Your Time ({userTimezone}):
              </Text>{" "}
              {userView}
            </Text>

            <Text fontSize="md" color="gray.500">
              <Text as="span" fontWeight="bold">
                UTC (Backend Value):
              </Text>{" "}
              {parisDateTimeISO}
            </Text>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default TestPage;
