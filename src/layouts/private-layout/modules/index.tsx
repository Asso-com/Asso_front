import { Box } from "@chakra-ui/react";
import ModuleList from "./ModuleList";

function Module() {
  return (
    <Box
      id="module_list"
      as="nav"
      h={`100%`}
     // boxShadow="lg"
     // borderWidth="1px"
      borderColor="gray.200"
      bg="secondary.500"
      //borderRadius="md"
    >
      <ModuleList />
    </Box>
  );
}

export default Module;
