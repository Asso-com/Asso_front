import { Flex, Badge } from "@chakra-ui/react";

const StandardColumnCellRender = ({ value }: { value: any }) => {
  return (
    <Flex gap={2} alignItems="center" p={2} height="100%">
      <Badge
        colorScheme={value ? "blue" : "gray"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="sm"
        variant="outline"
        px={2}
        maxH="25px"
      >
        {value ? "Yes" : "No"}
      </Badge>
    </Flex>
  );
};

export default StandardColumnCellRender;
