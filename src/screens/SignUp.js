import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayOut from "../components/Auth/AuthLayOut";
import BottomBox from "../components/Auth/BottomBox";
import Button from "../components/Auth/Button";
import FormError from "../components/Auth/FormError";
import Input from "../components/Auth/Input";
import Seperator from "../components/Auth/Seperator";
import TopBox from "../components/Auth/TopBox";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import routes from "../routes";

const STopBox = styled(TopBox)`
  padding-bottom: 5vh;
`;

const SubTitle = styled(FatText)`
  text-align: center;
  font-size: 1rem;
  line-height: 1.4;
  margin-top: 2vh;
`;
const SButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 1.1rem;
    margin-right: 0.5vw;
  }
`;

const SIGNUP_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  const history = useHistory();
  const onSubmitVaild = async (params) => {
    if (loading) return;
    const {
      data: {
        createAccount: { ok, error },
      },
    } = await signup({ variables: { ...params } });
    if (!ok) return setError("result", { message: error });
    history.push(routes.home, {
      message: "Successfully sign up. Please log in",
      username: params.username,
      password: params.password,
    });
  };
  return (
    <AuthLayOut>
      <PageTitle title="Sign up | Willstagram" />
      <STopBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <SubTitle>Sign up to see photos and videos from your friends.</SubTitle>
        <SButton type="submit">
          <i>
            <FontAwesomeIcon icon={faFacebookSquare} color="white" />
          </i>
          Log in with Facebook
        </SButton>
        <Seperator />
        <form
          onSubmit={handleSubmit(onSubmitVaild)}
          style={{ marginTop: "10px" }}
        >
          <Input
            {...register("firstName", { required: "Firstname is required" })}
            type="text"
            placeholder="First Name"
            hasErr={Boolean(errors.firstname)}
            onKeyDown={() => clearErrors("result")}
          />
          {errors.firstname && (
            <FormError>{errors.firstname?.message}</FormError>
          )}
          <Input
            {...register("lastName", {})}
            type="text"
            placeholder="Last Name"
            hasErr={Boolean(errors.lastname)}
            onKeyDown={() => clearErrors("result")}
          />

          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Check your eamil",
              },
            })}
            type="email"
            placeholder="Email"
            hasErr={Boolean(errors.email)}
            onKeyDown={() => clearErrors("result")}
          />
          {errors.email && <FormError>{errors.email?.message}</FormError>}
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            type="text"
            placeholder="Username"
            hasErr={Boolean(errors.username)}
            onKeyDown={() => clearErrors("result")}
          />
          {errors.username && <FormError>{errors.username?.message}</FormError>}
          <Input
            {...register("password", { password: "Password is required" })}
            type="password"
            placeholder="password"
            hasErr={Boolean(errors.password)}
            onKeyDown={() => clearErrors("result")}
          />
          {errors.password && <FormError>{errors.password?.message}</FormError>}
          <Button type="submit" disabled={!isValid || loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Log In"}
          </Button>
          {errors.result && <FormError>{errors.result?.message}</FormError>}
        </form>
      </STopBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayOut>
  );
};

export default SignUp;
