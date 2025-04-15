import { darken } from 'polished';

const primaryColor = 'rgba(144, 238, 61, .8)';

const theme = {
    colors: {
        primary: primaryColor,
        primaryDark: darken(0.25, primaryColor),
        primaryTransparent1: 'rgba(85, 171, 10, .5)',
        primaryTransparent2: 'rgba(85, 171, 10, .15)',
        background: '#000',
        text: '#000',
        inputBg: '#fff',
        inputBorder: primaryColor,
        placeholder: darken(0.25, primaryColor), 
        linkHover: '#ffa64d',
    },
};

export default theme;
