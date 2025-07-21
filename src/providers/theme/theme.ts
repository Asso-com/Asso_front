import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "'Inter', sans-serif",
        body: "'Inter', sans-serif",
    },
    colors: {
        primary: {
            50: "#e4f6fb",
            100: "#bde7f2",
            200: "#93d7e8",
            300: "#69c8df",
            400: "#3fb8d5",
            500: "#55B2C9",
            600: "#3791a4",
            700: "#2b6e7d",
            800: "#1f4a55",
            900: "#12272e",
        },
        secondary: {
            50: "#e5eaf3",
            100: "#c3cde0",
            200: "#9fb0cd",
            300: "#7b93ba",
            400: "c",
            500: "#335a94",
            600: "#284776",
            700: "#1e3559",
            800: "#14233b",
            900: "#0a111e",
        },
        brand: {
            50: '#e3f2fd',
            100: '#bbdefb',
            200: '#90caf9',
            300: '#64b5f6',
            400: '#42a5f5',
            500: '#2196f3',
            600: '#1e88e5',
            700: '#1976d2',
            800: '#1565c0',
            900: '#0d47a1',
        },
        accent: {
            50: '#fff3e0',
            100: '#ffe0b2',
            200: '#ffcc80',
            300: '#ffb74d',
            400: '#ffa726',
            500: '#ff9800',
            600: '#fb8c00',
            700: '#f57c00',
            800: '#ef6c00',
            900: '#e65100',
        }
    },
    components: {
        Table: {
            baseStyle: {
                fontFamily: "'Poppins', sans-serif",
            },
        },
        Button: {
            baseStyle: {
                fontWeight: '600',
                borderRadius: '12px',
            },
        },
        Textarea: {
            baseStyle: {
                field: {
                    borderRadius: "12px",
                    _hover: {
                        bg: "gray.100",
                    },
                    _focus: {
                        bg: "white",
                        borderColor: "brand.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    },
                },
            },
        },
        // Input: {
        //     baseStyle: {
        //         field: {
        //             borderRadius: "12px",
        //             _hover: {
        //                 bg: "gray.100",
        //             },
        //             _focus: {
        //                 bg: "white",
        //                 borderColor: "brand.500",
        //                 boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
        //             },
        //             _disabled: {
        //                 opacity: 0.8,
        //                 color: "black",
        //                 backgroundColor: "#e2e8f0",
        //                 cursor: "not-allowed",
        //             },
        //             _readOnly: {
        //                 opacity: 0.9,
        //                 backgroundColor: "#f8f9fa",
        //                 cursor: "default",
        //             },
        //         },
        //     },
        //     variants: {
        //         filled: {
        //             field: {
        //                 bg: 'gray.50',
        //                 borderRadius: '12px',
        //                 border: '2px solid transparent',
        //             },
        //         },
        //     },
        //     defaultProps: {
        //        // variant: 'filled',
        //     },
        // }
    },
});

export default theme;