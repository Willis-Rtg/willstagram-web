import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
const Darkmode = styled.div`
  margin-top: 20px;
`;
const DarkmodeBtn = styled.span``;

const AuthLayOut = ({ children }) => {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Darkmode>
        <DarkmodeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            color={darkMode ? "white" : ""}
          />
        </DarkmodeBtn>
      </Darkmode>
    </Container>
  );
};
export default AuthLayOut;
