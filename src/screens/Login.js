import { isLoggedInVar } from "../apollo";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => isLoggedInVar(true)}>Log In Now</button>
    </div>
  );
};

export default Login;
