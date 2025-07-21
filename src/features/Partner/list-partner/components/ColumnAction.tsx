import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import type { ICellRendererParams } from "ag-grid-community";
import useCreatePartner from "../hooks/useCreatePartner";
import type {
  ExternalPartners,
  PaternRequestDto,
} from "../types/AssociationType";

const ColumnAction: React.FC<ICellRendererParams<ExternalPartners>> = (
  params
) => {
  const { t } = useTranslation();
  const { mutateAsync: createAssociation, isPending } = useCreatePartner();

  const data = params.data;

  if (!data) return null;

  const isNotAvailable = data.status !== "Active";
  const isAlreadyAdded = data.isPartner === true;

  const handleAddAssociation = async () => {
    const requestDto: PaternRequestDto = {
      associationIdentifier: data.associationIdentifier,
      name: data.shortTitle,
      email: `contact@${data.shortTitle.toLowerCase().replace(/\s+/g, "")}.org`,
      phone: "",
      address: data.address || "N/A",
      currency: "EUR",
      currencySymbol: "€",
      participationCoefficient: 1.0,
      assiduityCoefficient: 1.0,
      quizCoefficient: 1.0,
      delayBeforeAttendance: 5,
    };

    try {
      await createAssociation(requestDto);
    } catch (error) {
      console.error("❌ Error creating association:", error);
    }
  };

  let buttonLabel = `+ ${t("Add")}`;
  let isDisabled = false;
  let bgColor = "green.500";
  let hoverColor = "green.600";
  let activeColor = "green.700";

  if (isNotAvailable) {
    buttonLabel = t("Not Available");
    isDisabled = true;
    bgColor = "gray.300";
  } else if (isAlreadyAdded) {
    buttonLabel = t("Added");
    isDisabled = true;
    bgColor = "gray.300";
  }

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <Button
        size="sm"
        colorScheme={!isDisabled ? "green" : undefined}
        variant={!isDisabled ? "solid" : "outline"}
        onClick={handleAddAssociation}
        isDisabled={isDisabled}
        isLoading={isPending}
        loadingText={t("Adding...")}
        bg={bgColor}
        _hover={{ bg: isDisabled ? "gray.300" : hoverColor }}
        _active={{ bg: isDisabled ? "gray.400" : activeColor }}
        _disabled={{
          bg: "gray.300",
          color: "gray.600",
          cursor: "not-allowed",
          borderColor: "gray.400",
        }}
      >
        {buttonLabel}
      </Button>
    </Flex>
  );
};

export default ColumnAction;
