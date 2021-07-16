import styled from "styled-components";

const SSeparator = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  div {
    width: 100%;
    height: 1px;
    background-color: rgba(219, 219, 219);
  }
  span {
    text-transform: uppercase;
    margin: 0 10px;
  }
`;

const Seperator = () => (
  <SSeparator>
    <div></div>
    <span>Or</span>
    <div></div>
  </SSeparator>
);

export default Seperator;
