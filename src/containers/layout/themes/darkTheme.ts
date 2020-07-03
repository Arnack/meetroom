import { createTheme } from 'office-ui-fabric-react';

export const darkTheme = createTheme({
    defaultFontStyle: { fontFamily: 'Montserrat, Roboto, Helvetica Neue, sans-serif', fontWeight: 'normal' },
    palette: {
        themePrimary: '#8eb580',
        themeLighterAlt: '#060705',
        themeLighter: '#171d15',
        themeLight: '#2b3627',
        themeTertiary: '#566d4d',
        themeSecondary: '#7d9f71',
        themeDarkAlt: '#98bc8b',
        themeDark: '#a7c79b',
        themeDarker: '#bcd6b3',
        neutralLighterAlt: '#272c3c',
        neutralLighter: '#2d3244',
        neutralLight: '#383d51',
        neutralQuaternaryAlt: '#3f4459',
        neutralQuaternary: '#444a5f',
        neutralTertiaryAlt: '#5e647a',
        neutralTertiary: '#f8f8f8',
        neutralSecondary: '#f9f9f9',
        neutralPrimaryAlt: '#fafafa',
        neutralPrimary: '#f5f5f5',
        neutralDark: '#fdfdfd',
        black: '#fefefe',
        white: '#202432',
    }});
