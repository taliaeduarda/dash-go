import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#181B23",
            "800": "#1F2829",
            "700": "#353646",
            "600": "#4B4D63",
            "500": "#616488",
            "400": "#797D9A",
            "300": "#9699B0",
            "200": "#B3B5C6",
            "150": "#ced4da",
            "100": "#D1D2DC",
            "50": "#EEEEF2",
        },
        white: {
            "100": "#ffffff"
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