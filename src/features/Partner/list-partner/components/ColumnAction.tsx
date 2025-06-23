import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import type { ICellRendererParams } from "ag-grid-community";
import useCreatePartner from "../hooks/useCreatePartner";
import type { Association, PaternRequestDto } from "../types/AssociationType";

const ColumnAction: React.FC<ICellRendererParams<Association>> = (params) => {
  const { t } = useTranslation();
  const { mutateAsync: createAssociation, isPending } = useCreatePartner();

  const handleAddAssociation = async () => {
    const data = params.data;
    if (!data) return;

    const requestDto: PaternRequestDto = {
      associationIdentifier: data.associationIdentifier,
      name: data.shortTitle,
      email: `contact@${data.shortTitle.toLowerCase().replace(/\s+/g, "")}.org`,
      phone: "",
      address: data.address || "N/A",
      currency: "EUR",
      currencySymbol: "€",
    };

    try {
      await createAssociation(requestDto);
    } catch (error) {
      console.error("❌ Error creating association:", error);
    }
  };

  const isAdded = params.data?.isPartner;

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <Button
        size="sm"
        colorScheme={isAdded ? undefined : "green"}
        variant={isAdded ? "outline" : "solid"}
        onClick={handleAddAssociation}
        isDisabled={isAdded}
        isLoading={isPending}
        loadingText={t("Adding...")}
        bg={isAdded ? "gray.300" : "green.500"}
        _hover={isAdded ? { bg: "gray.300" } : { bg: "green.600" }}
        _active={isAdded ? { bg: "gray.400" } : { bg: "green.700" }}
        _disabled={{
          bg: "gray.300",
          color: "gray.600",
          cursor: "not-allowed",
          borderColor: "gray.400",
        }}
      >
        {isAdded ? t("Added") : `+ ${t("Add")}`}
      </Button>
    </Flex>
  );
};

export default ColumnAction;
