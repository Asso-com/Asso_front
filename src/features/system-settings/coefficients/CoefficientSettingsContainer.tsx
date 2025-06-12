import React from "react";
import { useSelector } from "react-redux";
import { Box, Spinner, Center, Text } from "@chakra-ui/react";
import type { RootState } from "@store/index";
import CoefficientPresenter from "./CoefficientPresenter";
import useFetchCoefficients from "./hooks/useFetchCoefficients";

const CoefficientContainer: React.FC = () => {
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  console.log("Association ID:", associationId);
  
  const { data, isLoading, error } = useFetchCoefficients(associationId);
  console.log("Query result:", { data, isLoading, error });
  
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

  return (
    <CoefficientPresenter 
      rows={data || []} 
      total={data?.length || 0} 
    />
  );
};

export default CoefficientContainer;