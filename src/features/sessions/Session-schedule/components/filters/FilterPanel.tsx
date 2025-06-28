import {
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Flex,
  Heading,
  Icon,
  Button,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiFilter, FiList, FiGrid } from "react-icons/fi";
import FilterSelect from "./FilterSelect";
import ActiveFilters from "./ActiveFilters";
import DatePeriodNavigator from "../ui/DatePeriodNavigator";
import { useTranslation } from "react-i18next";

interface FilterPanelProps {
  selectedDay: string;
  setSelectedDay: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  selectedStaff: string;
  setSelectedStaff: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  filterOptions: {
    days: string[];
    subjects: string[];
    staff: string[];
    levels: string[];
  };
  hasActiveFilters: boolean;
  clearFilters: () => void;
  viewMode: "grouped" | "cards";
  setViewMode: (mode: "grouped" | "cards") => void;
  dayNames: Record<string, string>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedDay,
  setSelectedDay,
  selectedLevel,
  setSelectedLevel,
  selectedSubject,
  setSelectedSubject,
  selectedStaff,
  setSelectedStaff,
  selectedStatus,
  setSelectedStatus,
  filterOptions,
  hasActiveFilters,
  clearFilters,
  viewMode,
  setViewMode,
  dayNames,
}) => {
  const { t } = useTranslation();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  const statusOptions = [
    { value: "pending", label: t("Pending") },
    { value: "attendance_taken", label: t("Attendance Taken") },
    { value: "validated", label: t("Validated") },
    { value: "canceled", label: t("Canceled") },
  ];

  return (
    <Card
      bg={cardBgColor}
      shadow="lg"
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
    >
      <CardHeader>
        <VStack align="stretch" spacing={4}>
          <Flex
            justify="space-between"
            align={{ base: "start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={4}
          >
            <HStack>
              <Icon as={FiFilter} color={accentColor} boxSize={5} />
              <Heading size="sm" color="gray.700">
                {t("Filters & Search")}
              </Heading>
            </HStack>

            <DatePeriodNavigator />

            <HStack spacing={2} flexWrap="wrap">
              <Button
                size="sm"
                variant={viewMode === "grouped" ? "solid" : "outline"}
                colorScheme="blue"
                leftIcon={<FiList />}
                onClick={() => setViewMode("grouped")}
              >
                {t("By Day")}
              </Button>
              <Button
                size="sm"
                variant={viewMode === "cards" ? "solid" : "outline"}
                colorScheme="blue"
                leftIcon={<FiGrid />}
                onClick={() => setViewMode("cards")}
              >
                {t("Grid")}
              </Button>
              <Button size="sm" variant="ghost" onClick={clearFilters}>
                {t("Reset")}
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </CardHeader>

      <CardBody pt={0}>
        <VStack spacing={4}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={4} w="full">
            <FilterSelect
              value={selectedLevel}
              onChange={setSelectedLevel}
              placeholder={t("Level")}
              options={filterOptions.levels}
              bg={bgColor}
            />

            <FilterSelect
              value={selectedSubject}
              onChange={setSelectedSubject}
              placeholder={t("Subject")}
              options={filterOptions.subjects}
              bg={bgColor}
            />

            <FilterSelect
              value={selectedStaff}
              onChange={setSelectedStaff}
              placeholder={t("Teacher")}
              options={filterOptions.staff}
              bg={bgColor}
            />
            <FilterSelect
              value={selectedDay}
              onChange={setSelectedDay}
              placeholder={t("Day")}
              options={filterOptions.days}
              bg={bgColor}
              optionFormatter={(day) => dayNames[day] || day}
            />
            <FilterSelect
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder={t("Status")}
              options={statusOptions.map((opt) => opt.value)}
              bg={bgColor}
              optionFormatter={(status) =>
                statusOptions.find((opt) => opt.value === status)?.label ||
                status
              }
            />
          </SimpleGrid>

          {hasActiveFilters && (
            <ActiveFilters
              selectedDay={selectedDay}
              selectedLevel={selectedLevel}
              selectedSubject={selectedSubject}
              selectedStaff={selectedStaff}
              selectedStatus={selectedStatus}
              dayNames={dayNames}
            />
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default FilterPanel;
