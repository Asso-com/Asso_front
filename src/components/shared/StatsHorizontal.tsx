import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  Icon,
  IconButton,
  type BoxProps,
} from "@chakra-ui/react";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { type IconType } from "react-icons";

interface StatsHorizontalProps extends BoxProps {
  icon?: IconType;
  color?: string;
  stats?: string | number;
  renderStats?: () => ReactNode;
  statTitle: string;
  className?: string;
  statsMargin?: string;
}

const StatsHorizontal: React.FC<StatsHorizontalProps> = ({
  icon,
  color = "gray.600",
  stats,
  renderStats,
  statTitle,
  className,
  statsMargin,
  ...boxProps
}) => {
  const { t } = useTranslation();

  const statsMarginClass = useBreakpointValue({
    base: "mb-4",
    md: statsMargin || "mb-0",
  });

  return (
    <Box
      className={className}
      //borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      width="100%"
      bg="white"
      {...boxProps}
    >
      <Box p={4}>
        <Flex justify="space-between" align="center">
          <Box>
            {renderStats ? (
              renderStats()
            ) : (
              <Text
                fontSize="md"
                fontWeight="semibold"
                className={statsMarginClass}
              >
                {stats}
              </Text>
            )}
            <Text fontSize="sm" color="gray.500">
              {t(statTitle)}
            </Text>
          </Box>
          {icon && (
            <IconButton
              aria-label="Stats Icon"
              icon={<Icon as={icon} color={color} boxSize={6} />}
              variant="solid"
              borderRadius="2xl"
              size="sm"
              _hover={{ bg: "gray.100" }}
              _active={{ bg: "gray.200" }}
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default StatsHorizontal;
