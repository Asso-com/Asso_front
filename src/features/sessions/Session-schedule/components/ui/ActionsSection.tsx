import {
  Button,
  ButtonGroup,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

import useCreateSessionDates from "../../hooks/useCreateSessionDates";

interface Props {
  periodWeeksId: number;
}

const ActionsSection: React.FC<Props> = ({ periodWeeksId }) => {
  const { t } = useTranslation();

  const successColor = useColorModeValue("green.500", "green.300");
  const dangerColor = useColorModeValue("red.500", "red.300");

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: generateSessions, isPending: isGenerating } =
    useCreateSessionDates(associationId, periodWeeksId);

  return (
    <ButtonGroup spacing={3} size="sm">
      <Tooltip
        label={t("Generate session dates for the selected period")}
        hasArrow
        placement="auto"
      >
        <Button
          colorScheme="green"
          variant="solid"
          leftIcon={<FiPlus />}
          onClick={() => generateSessions()}
          isLoading={isGenerating}
          loadingText={t("Generating...")}
          bg={successColor}
          color="white"
          _hover={{
            bg: useColorModeValue("green.600", "green.400"),
            transform: "translateY(-1px)",
            shadow: "md",
          }}
          _active={{
            bg: useColorModeValue("green.700", "green.500"),
            transform: "translateY(0)",
          }}
          transition="all 0.2s"
          fontWeight="medium"
        >
          {t("Generate Sessions")}
        </Button>
      </Tooltip>

      <Tooltip
        label={t("Clear all session dates from the selected period")}
        hasArrow
        placement="auto"
      >
        <Button
          colorScheme="red"
          variant="outline"
          leftIcon={<FiTrash2 />}
          // onClick={onClearSessionDates}
          // isLoading={isClearing}
          loadingText={t("Clearing...")}
          borderColor={dangerColor}
          color={dangerColor}
          _hover={{
            bg: dangerColor,
            color: "white",
            transform: "translateY(-1px)",
            shadow: "md",
          }}
          _active={{
            bg: useColorModeValue("red.600", "red.400"),
            transform: "translateY(0)",
          }}
          transition="all 0.2s"
          fontWeight="medium"
        >
          {t("Clear Sessions")}
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};

export default ActionsSection;
