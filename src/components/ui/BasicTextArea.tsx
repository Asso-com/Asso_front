import { Textarea, type TextareaProps } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

interface BasicTextAreaProps extends TextareaProps {
  placeholder?: string
  fontSize?: number | string
  rows?: number
  resize?: "none" | "both" | "horizontal" | "vertical"
  formikField?: Partial<
    Pick<TextareaProps, "value" | "onChange" | "onBlur" | "name">
  >
}

const BasicTextArea: React.FC<BasicTextAreaProps> = ({
  placeholder = "Enter text",
  fontSize = 14,
  rows = 3,
  resize = "none",
  formikField = {},
  ...textAreaProps
}) => {
  const { t } = useTranslation()

  return (
    <Textarea
      placeholder={t(placeholder)}
      fontSize={fontSize}
      rows={rows}
      resize={resize}
      sx={{
        _disabled: {
          opacity: 0.8,
          color: "black",
          fontWeight: "bold",
          backgroundColor: "#e2e8f0",
          cursor: "not-allowed",
        },
      }}
      {...textAreaProps}
      {...formikField}
    />
  )
}

export default BasicTextArea
