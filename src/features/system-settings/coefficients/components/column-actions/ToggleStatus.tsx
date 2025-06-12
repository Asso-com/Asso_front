import React from "react";
import { Switch } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

interface ICellRendererParams {
  data: any;
  value: boolean;
}

const ToggleStatus: React.FC<ICellRendererParams> = ({ data, value }) => {
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  
  const handleToggle = () => {
    // Ici vous pouvez implémenter la logique pour changer le statut
    console.log("Toggle status for:", data.id, "Current value:", value);
  };

  return (
    <Switch
      isChecked={value}
      onChange={handleToggle}
      size="md"
      colorScheme="green"
    />
  );
};

export default ToggleStatus;