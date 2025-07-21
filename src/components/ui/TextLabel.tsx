import { Text, type TextProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface TextLabelProps extends TextProps {
  label: string;
  fontSize?: number | string;
  fontWeight?: string | number;
  maxWidth?: string | number;
}

const TextLabel: React.FC<TextLabelProps> = ({
  label,
  fontSize = "sm",
  fontWeight = "normal",
  maxWidth = "100%",
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Text
      fontSize={fontSize}
      fontWeight={fontWeight}
      maxW={maxWidth}
      isTruncated
      overflow="hidden"
      textOverflow="ellipsis"
      {...props}
    >
      {t(label)}
    </Text>
  );
};

export default TextLabel;
