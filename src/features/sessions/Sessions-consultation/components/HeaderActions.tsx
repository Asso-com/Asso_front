import { Box, Flex, Skeleton } from "@chakra-ui/react";
import type { DatePeriod } from "@features/sessions/Session-schedule/components/ui/DatePeriodNavigator";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";
import DatePeriodNavigator from "@features/sessions/Session-schedule/components/ui/DatePeriodNavigator";

interface HeaderActionsProps {
  gridRef: any;
  weeksOptions: DatePeriod[];
  handleWeekChange: (period: DatePeriod) => void;
  defaultSelectedIndex: number;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ 
  gridRef, 
  weeksOptions, 
  handleWeekChange, 
  defaultSelectedIndex 
}) => {
  //const { t } = useTranslation();
  return (
    <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        {weeksOptions.length === 0 ? (
          <Skeleton height="48px" width="300px" borderRadius="xl" />
        ) : (
          <DatePeriodNavigator
            weeksOptions={weeksOptions}
            onPeriodChange={handleWeekChange}
            defaultSelectedIndex={defaultSelectedIndex}
          />
        )}
        <Flex alignItems="center" gap={2}>
          <ClearFilter gridRef={gridRef} />
          <QuickFilter gridRef={gridRef} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeaderActions;
