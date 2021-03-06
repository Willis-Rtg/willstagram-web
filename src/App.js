import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Layout from "./components/Layout";
import routes from "./routes";
import Hashtag from "./screens/Hashtag";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Profile from "./screens/Profile";
import SignUp from "./screens/SignUp";
import { darkTheme, GloabalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GloabalStyles />
          <Router>
            <Switch>
              <Layout>
                <Route path={routes.home} exact>
                  {isLoggedIn ? <Home /> : <Login />}
                </Route>
                {!isLoggedIn ? (
                  <Route path={routes.signUp} component={SignUp} exact />
                ) : null}
                <Route path={routes.profile} component={Profile} />
                <Route path={routes.hashtag} component={Hashtag} />
              </Layout>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
