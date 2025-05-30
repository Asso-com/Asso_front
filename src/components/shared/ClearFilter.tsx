import React, { useState, useEffect } from "react";

import { MdOutlineFilterAltOff, MdFilterAlt } from "react-icons/md";
import { Box, Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "./icons-buttons/GenericIconButtonWithTooltip";

function ClearFilter({ gridRef }: any) {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const checkFilterStatus = () => {
    if (gridRef.current?.api) {
      const isActive = gridRef.current.api.isAnyFilterPresent();
      setIsFilterActive(isActive);
    }
  };

  const handleClearFilter = () => {
    if (gridRef.current?.api) {
      gridRef.current?.api?.setFilterModel(null);
      gridRef.current?.api?.onFilterChanged();
      setIsFilterActive(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (gridRef.current?.api) {
        checkFilterStatus();

        const filterChangedListener = () => {
          checkFilterStatus();
        };

        gridRef.current.api.addEventListener(
          "filterChanged",
          filterChangedListener
        );

        clearInterval(interval);

        return () => {
          gridRef.current.api.removeEventListener(
            "filterChanged",
            filterChangedListener
          );
        };
      }
    }, 100); // check every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Flex alignItems={"center"} position={"relative"}>
        <GenericIconButtonWithTooltip
          icon={
            isFilterActive ? (
              <MdFilterAlt size={20} color="#2196f3" />
            ) : (
              <MdOutlineFilterAltOff size={20} color="#666" />
            )
          } // Blue filter icon when active, gray filter-off icon when inactive
          label={"Clear filter"}
          ariaLabel={"Clear filter"}
          onClick={handleClearFilter}
          size="md"
        />
        {isFilterActive && (
          <Box
            height={2}
            width={2}
            borderRadius="full"
            bg="#2196f3"
            position="absolute"
            top={2}
            right={2}
          />
        )}
      </Flex>
    </>
  );
}

export default ClearFilter;
