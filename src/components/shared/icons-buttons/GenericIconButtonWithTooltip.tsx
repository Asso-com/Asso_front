import {
  IconButton,
  type IconButtonProps,
  Tooltip,
  type TooltipProps,
} from "@chakra-ui/react"

interface GenericIconButtonWithTooltipProps
  extends Omit<IconButtonProps, "aria-label"> {
  label: string
  showTooltip?: boolean
  placement?: TooltipProps["placement"]
  ariaLabel?: string
}

const GenericIconButtonWithTooltip: React.FC<
  GenericIconButtonWithTooltipProps
> = ({
  label,
  showTooltip = true,
  placement = "bottom",
  ariaLabel,
  ...props
}) => {
  const button = <IconButton aria-label={ariaLabel || label} {...props} />

  if (showTooltip) {
    return (
      <Tooltip label={label} placement={placement} hasArrow>
        {button}
      </Tooltip>
    )
  }

  return button
}

export default GenericIconButtonWithTooltip
