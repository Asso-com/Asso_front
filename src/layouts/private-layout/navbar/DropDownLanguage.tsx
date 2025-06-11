import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Flex,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"
import { MdLanguage, MdCheck } from "react-icons/md"
import Flag from "react-world-flags"

const DropDownLanguage = () => {
  const { i18n, t } = useTranslation()
  const selectedLanguage = i18n.language || "en"

  const menuBg = useColorModeValue("white", "gray.800")
  const menuItemHover = useColorModeValue("gray.50", "gray.700")
  const activeItemBg = useColorModeValue("blue.50", "blue.900")
  const activeItemColor = useColorModeValue("blue.600", "blue.200")

  const languages = useMemo(
    () => [
      { lang: "en", label: t("English"), flag: "US" },
      { lang: "fr", label: t("French"), flag: "FR" },
      { lang: "ar", label: t("Arabic"), flag: "SA" },
    ],
    [t]
  )

  const handleLanguageChange = (language: string) => {
    if (language !== selectedLanguage) {
      i18n.changeLanguage(language)
      localStorage.setItem("i18nextLng", language)
    }
  }

  const currentFlag =
    languages.find(l => l.lang === selectedLanguage)?.flag || "US"

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={MdLanguage} boxSize={5} />}
        variant="ghost"
        size="sm"
        borderRadius="md"
        px={3}
        py={4}
        aria-label="Select Language"
        _hover={{ bg: "gray.100" }}
        _active={{ bg: "gray.200" }}
      >
        <Flex align="center" gap={2}>
          <Flag
            code={currentFlag}
            style={{ width: "25px", borderRadius: "2px" }}
          />
          <Text fontSize="sm" fontWeight="medium">
            {selectedLanguage.toUpperCase()}
          </Text>
        </Flex>
      </MenuButton>

      <MenuList
        minWidth="160px"
        borderRadius="lg"
        boxShadow="xl"
        bg={menuBg}
        border="none"
        py={1}
      >
        {languages.map(({ lang, label, flag }) => (
          <MenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            _hover={{ bg: menuItemHover }}
            px={3}
            py={2}
            borderRadius="md"
            bg={selectedLanguage === lang ? activeItemBg : "transparent"}
          >
            <Flex align="center" justify="space-between" width="full">
              <Flex align="center" gap={3}>
                <Box width="20px">
                  <Flag
                    code={flag}
                    style={{ width: "100%", borderRadius: "2px" }}
                  />
                </Box>
                <Text
                  fontSize="sm"
                  color={
                    selectedLanguage === lang ? activeItemColor : "inherit"
                  }
                  fontWeight={selectedLanguage === lang ? "semibold" : "normal"}
                >
                  {label}
                </Text>
              </Flex>
              {selectedLanguage === lang && (
                <Icon as={MdCheck} boxSize={4} color={activeItemColor} />
              )}
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default DropDownLanguage
