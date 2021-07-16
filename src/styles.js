import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "rgb(250, 250, 250)",
  boxColor: "white",
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
  boxColor: "#333333",
  borderColor: "rgb(219, 219, 219)",
};

export const GloabalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    font-size:14px;
    font-family: 'Open Sans', sans-serif;
    color: rgb(38, 38, 38);
  } 
  input{
    all:unset;
  }
  button{
    all:unset;
  }
  a{
    text-decoration: none;
  }

`;
