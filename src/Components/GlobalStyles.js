import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
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
    }

    html {
    --color-theme: #1B4478;
    --color-line: #C39D78;
    --color-text: #E4E4E4;
    --color-theme2:#C39D78;
    --color-line2: black;
    --color-text2: white;

  }
  html::-webkit-scrollbar {
                width: 1px; /*스크롤바의 너비*/
            }
 
            body::-webkit-scrollbar-thumb {
                background-color: black; /*스크롤바의 색상*/
            }
 
            body::-webkit-scrollbar-track {
                background-color: yellow; /*스크롤바 트랙 색상*/
            }
`;

export default globalStyles;
