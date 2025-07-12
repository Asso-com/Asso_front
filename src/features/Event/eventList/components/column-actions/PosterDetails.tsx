import { Text } from "@chakra-ui/react";

interface ViewEventProps {
  details?: Record<string, any>;
  onClose: () => void;
}

const PosterDetails: React.FC<ViewEventProps> = () => {
  return <Text>Coming soon...</Text>;
};

export default PosterDetails;
