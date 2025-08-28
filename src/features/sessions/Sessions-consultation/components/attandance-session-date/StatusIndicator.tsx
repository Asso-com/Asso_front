import { Flex, Switch, Text } from "@chakra-ui/react";

const StatusIndicator = ({
  isActive,
  label,
  colorScheme,
  onToggle,
  isDisabled = false,
}: {
  isActive: boolean;
  label: string;
  colorScheme: string;
    onToggle: () => void;
  isDisabled?: boolean;
}) => (
  <Flex align="center" gap={3}>
    <Switch
      isChecked={isActive}
      onChange={onToggle}
      isDisabled={isDisabled}
      colorScheme={colorScheme}
      size="md"
    />
    <Text fontSize="sm" fontWeight="medium">
      {label}
    </Text>
  </Flex>
);
export default StatusIndicator;
