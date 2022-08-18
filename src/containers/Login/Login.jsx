import React, { useState, useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import Marginer from "./components/Wrapper";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ switchToSignup }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true);

  const checkError = () => {
    if (email !== "" && username !== "" && password !== "") {
      setError(false);
    } else {
      setError(true);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (email === "" && username === "" && password === "") {
      return;
    }

    const data = {
      username,
      email,
      password,
    };

    localStorage.setItem("username", username);
    setTimeout(() => {
      navigate(`/home`);
    }, 2000);
  };

  useEffect(() => {
    checkError();
  }, [email, username, password]);
  return (
    <>
      {" "}
      <BoxContainer>
        <FormContainer autoComplete="new-password">
          <form autoComplete="new-password">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              autoComplete="new-password"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              autoComplete="new-password"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </form>
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton error={error} onClick={submit} type="submit">
          Signin
        </SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <MutedLink>
          Don't have an accoun?{" "}
          <BoldLink onClick={switchToSignup}>Signup</BoldLink>
        </MutedLink>
      </BoxContainer>
    </>
  );
};

export default LoginForm;
