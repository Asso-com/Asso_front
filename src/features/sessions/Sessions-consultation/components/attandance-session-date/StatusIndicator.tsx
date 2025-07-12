import { Flex, Switch, Text } from "@chakra-ui/react";

const StatusIndicator = ({
  isActive,
  label,
  colorScheme,
  onToggle,
}: {
  isActive: boolean;
  label: string;
  colorScheme: string;
  onToggle: () => void;
}) => (
  <Flex align="center" gap={3}>
    <Switch
      isChecked={isActive}
      onChange={onToggle}
      colorScheme={colorScheme}
      size="lg"
    />
    <Text fontSize="sm" fontWeight="medium">
      {label}
    </Text>
  </Flex>
);
export default StatusIndicator;
