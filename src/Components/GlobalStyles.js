import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
const globalStyles= createGlobalStyle`
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

    
`;


export default globalStyles;