import { Button, type ButtonProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface AuthButtonProps extends ButtonProps {
  title: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, ...props }) => {
  const { t } = useTranslation();
  return (
    <Button
      mt={4}
      mb={2}
      type="submit"
      width="100%"
      bg="brand.500"
      color="white"
      _hover={{
        bg: "brand.600",
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      _active={{
        bg: "brand.700",
        transform: "translateY(0px)",
      }}
      {...props}
    >
      {t(title)}
    </Button>
  );
};

export default AuthButton;
