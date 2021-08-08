import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import Header from "./Header";

const Content = styled.main`
  margin: 45px auto;
  max-width: 930px;
  width: 100%;
`;

const Layout = ({ children }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <>
      {isLoggedIn && <Header />}
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
