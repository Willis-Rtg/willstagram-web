import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
  color: ${(props) => props.theme.fontColor};
`;

export const FatText = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;
