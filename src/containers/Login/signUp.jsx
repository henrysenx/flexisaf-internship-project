import React, { useState } from "react";
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

const SignUpForm = ({ switchToSignin }) => {
  let navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const data = {
      fullName,
      email,
      password,
    };
    console.log(data);
    navigate(`/home`);
  };
  return (
    <BoxContainer>
      <FormContainer>
        <Input
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={submit} type="submit">
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        Already have an account?
        <BoldLink onClick={switchToSignin}>Signin</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignUpForm;
