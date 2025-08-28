import { Box, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import type { GuardianType } from "../../types";
const GUARDIAN_COLORS = {
  father: "green",
  mother: "pink",
  other: "purple",
  tutor: "teal",
} as const;
interface GuardianSelectionProps {
  guardianSelection: GuardianType;
  onGuardianChange: (value: string) => void;
}

const GuardianSelection: React.FC<GuardianSelectionProps> = ({
  guardianSelection,
  onGuardianChange,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Heading size="md" mb={4} color="orange.600">
        {t("Guardian Selection")}
      </Heading>
      <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
        <RadioGroup value={guardianSelection} onChange={onGuardianChange}>
          <Stack direction="column" spacing={3}>
            <Radio value="father" colorScheme={GUARDIAN_COLORS.father}>
              {t("Father is the Guardian")}
            </Radio>
            <Radio value="mother" colorScheme={GUARDIAN_COLORS.mother}>
              {t("Mother is the Guardian")}
            </Radio>
            <Radio value="other" colorScheme={GUARDIAN_COLORS.other}>
              {t("Other person is the Guardian")}
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Box>
  );
};
export default GuardianSelection;
