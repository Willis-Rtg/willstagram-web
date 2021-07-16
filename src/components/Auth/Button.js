import styled, { css, keyframes } from "styled-components";

const spinner = keyframes`
  from  { transform : rotate(0deg);}
  to { transform : rotate(360deg);}
`;

const Button = styled.button`
  width: 100%;
  margin-top: 15px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 9px 0;
  font-weight: 800;
  font-size: 14px;
  border-radius: 4px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  svg {
    animation: ${(props) =>
      props.name === "login"
        ? css`
            ${spinner} 1s ease infinite
          `
        : null};
  }
`;

export default Button;
