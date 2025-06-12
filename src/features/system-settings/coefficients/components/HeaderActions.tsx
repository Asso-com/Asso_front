import React from 'react';
import { Flex } from '@chakra-ui/react';
import type { AgGridReact } from 'ag-grid-react';
import CoefficientSidebar from './sidebar/CoefficientSidebar';

interface HeaderActionsProps {
  gridRef: React.RefObject<AgGridReact>;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ gridRef }) => {
  return (
    <Flex justifyContent="flex-end" mb={2}>
      <CoefficientSidebar />
    </Flex>
  );
};

export default HeaderActions;