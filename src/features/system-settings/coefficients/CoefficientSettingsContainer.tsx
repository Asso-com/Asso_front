import CoefficientPresenter from "./CoefficientPresenter";
import useFetchCoefficients from "./hooks/useFetchCoefficients";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { Spinner, Center, Text } from "@chakra-ui/react";

const CoefficientSettingsContainer = () => {
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const { data, isLoading, error } = useFetchCoefficients(associationId);

  if (isLoading) {
    return (
      <Center h="100%">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100%">
        <Text color="red.500">Error loading coefficients: {error.message}</Text>
      </Center>
    );
  }

  return <CoefficientPresenter rows={data || []} total={data?.length || 0} />;
};

export default CoefficientSettingsContainer;