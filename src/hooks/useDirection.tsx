import { useTheme } from "@chakra-ui/react";

/**
 * A custom hook to retrieve the text direction from the current theme.
 *
 * @returns {Object} An object containing:
 * - `direction`: The text direction, either 'ltr' (left-to-right) or 'rtl' (right-to-left),
 *   defaulting to 'ltr' if not specified in the theme.
 * - `isRTL`: A boolean indicating whether the current text direction is 'rtl'.
 */

export const useDirection = () => {
  const theme = useTheme();
  return {
    direction: theme.direction || "ltr",
    isRTL: theme.direction === "rtl",
  };
};
