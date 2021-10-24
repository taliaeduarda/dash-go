import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#181B23",
            "800": "#1F2829",
            "750": "#445D72",
            "700": "#353646",
            "600": "#4B4D63",
            "500": "#616488",
            "400": "#797D9A",
            "300": "#9699B0",
            "200": "#B3B5C6",
            "150": "#ced4da",
            "100": "#D1D2DC",
            "50": "#EEEEF2",
            "10": "#F9F9FA"
        },
        white: {
            "100": "#ffffff"
        },
        green: {
            "100": "#70e2cb",
            "900": "#445D72"
        },
        teal: {
            '200': "#718F94"
        },
        blue: {
            "400": '#8AA2A9'
        },
        purple: {
            "100": "#F6E4F6"
        }
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    styles: {
        global: {
            body: {
                bg: '#EFF0F2',
                color: 'gray.800'
            }
        }
    }
})