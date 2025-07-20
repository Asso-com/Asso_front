import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Spinner, Center, Text } from "@chakra-ui/react";
import AnnoncePresenter from "./AnnoncePresenter";
import useFetchAnnonces from "./hooks/useFetchAnnonce";

const AnnonceContainer: React.FC = () => {
  const associationId = useSelector((state: any) => state.authSlice.associationId);
  const [selectedType] = useState<string | undefined>(undefined);
  
  const { data = [], isLoading, error } = useFetchAnnonces(associationId, selectedType);

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
        <Text color="red.500">Error loading annonces: {error.message}</Text>
      </Center>
    );
  }

  return (
    <AnnoncePresenter
      rows={data}
      total={data.length}
    />
  );
};

export default AnnonceContainer;