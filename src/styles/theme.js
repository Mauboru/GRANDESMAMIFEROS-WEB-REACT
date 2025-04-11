import { darken } from 'polished';

const primaryColor = '#55ab24';

const theme = {
    colors: {
        primary: primaryColor,
        primaryDark: darken(0.25, primaryColor),
        primaryTransparent1: 'rgba(85, 171, 10, .5)',
        primaryTransparent2: 'rgba(85, 171, 10, .15)',
        background: '#000',
        text: '#FFF',
        inputBg: '#6c756d',
        inputBorder: '#444',
        placeholder: '#BBB', 
        linkHover: '#ffa64d',
    },
};

export default theme;
