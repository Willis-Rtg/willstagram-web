import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 10px 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasErr ? "tomato" : props.theme.borderColor)};
  border-radius: 3px;
  font-size: 12px;
  margin-top: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
