import React from 'react';
import { Box } from '@chakra-ui/react';
import type { ICellRendererParams } from 'ag-grid-community';

const ColorSquareCellRenderer: React.FC<ICellRendererParams> = ({ value }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box
        width="20px"
        height="20px"
        backgroundColor={value}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="2px"
        boxShadow="sm"
      />
    </Box>
  );
};

export default ColorSquareCellRenderer;