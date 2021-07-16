import styled from "styled-components";
import { BaseBox } from "../shared";

const TopBox = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 40px 20px 40px;

  h1 {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
    width: 100%;
  }
`;

export default TopBox;
