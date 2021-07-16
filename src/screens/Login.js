import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayOut from "../components/Auth/AuthLayOut";
import Button from "../components/Auth/Button";
import Seperator from "../components/Auth/Seperator";
import Input from "../components/Auth/Input";
import TopBox from "../components/Auth/TopBox";
import BottomBox from "../components/Auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/Auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";

const WithFacebook = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  i {
    font-size: 20px;
    margin-right: 7px;
  }
  span {
    font-weight: 600;
    color: #385185;
  }
`;
const Forgetpw = styled.div`
  margin-top: 10px;
  font-size: 13px;
`;
const Alert = styled.h5`
  color: #2ecc71;
  margin-top: 3vh;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location.state?.username || "",
      password: location.state?.password || "",
    },
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const onSubmitVaild = async (params) => {
    if (loading) return;
    // login({ variables: { ...params } });
    const {
      data: {
        login: { ok, token, error },
      },
    } = await login({ variables: { ...params } });
    if (!ok) return setError("result", { message: error });
    if (token) {
      logUserIn(token);
    }
  };

  const clearLoginError = () => clearErrors("result");
  return (
    <AuthLayOut>
      <PageTitle title="Log in | Willstagram" />
      <TopBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        {location.state?.message && <Alert>{location.state?.message}</Alert>}
        <form onSubmit={handleSubmit(onSubmitVaild)}>
          <Input
            {...register("username", {
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
              required: { value: true, message: "Username is required" },
            })}
            type="text"
            placeholder="Username"
            hasErr={Boolean(errors.username)}
            onKeyDown={clearLoginError}
          />
          {errors.username && <FormError>{errors.username?.message}</FormError>}
          <Input
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
            type="password"
            placeholder="Password"
            hasErr={Boolean(errors?.password)}
            onKeyDown={clearLoginError}
          />
          {errors.password && <FormError>{errors.password?.message}</FormError>}
          <Button name="login" type="submit" disabled={!isValid || loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Log In"}
          </Button>
          {errors.result && <FormError>{errors.result?.message}</FormError>}
        </form>
        <Seperator />
        <WithFacebook>
          <i>
            <FontAwesomeIcon icon={faFacebookSquare} color="#385185" />
          </i>
          <span>Log in with Facebook</span>
        </WithFacebook>
        <Forgetpw>
          <span>Forgot password?</span>
        </Forgetpw>
      </TopBox>
      <BottomBox
        cta="Don't have an accound?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayOut>
  );
};

export default Login;
