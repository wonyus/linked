"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "next/navigation";
import React from "react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
  };
  return (
    <Container>
      <TextField type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
      <TextField type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={() => handleSubmit()}> Submit </Button>
    </Container>
  );
};

export default LoginForm;
