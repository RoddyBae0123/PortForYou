import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
        &:hover{
            text-decoration:none;
        }
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:15px;
        background-color: white;
        color:RGB(74, 86, 94);
    }
    button{
        border:none;
        background-color:transparent;
        cursor:pointer;
        &:focus{
            outline:none;
        }
    }

    html {
    --color-theme: #1B4478;
    --color-line: #C39D78;
    --color-text: #E4E4E4;
    --color-theme2:#C39D78;
    --color-line2: black;
    --color-text2: white;

    /* new color */
    --color-background:rgba(224,231,255,0.2);
    --color-background-focus:#E8EDFF;
    --color-border:rgb(224,231,255);
    --color-button:rgb(46,91,255);
    --color-signText:rgb(176,186,201);
    --color-warning:#FF8484;
    --color-warningBack:#FCE4E5;
    --color-text-ver1:#2E384D;
    --color-text-ver2:#8798AD;
    --color-text-ver3:#B0BAC9;
    --color-text-ver4:#F2F4F7;
  }

`;

export default globalStyles;
