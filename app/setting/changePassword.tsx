"use client";

import { Button, Container, TextField } from "@mui/material";
import ReduxWrapper from "@Redux/Provider";
import { useChangePasswordMutation } from "@Redux/services/users";
import React from "react";

const ChangePassword = () => {
  const [oldPassword, setoldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [changePassword, ] = useChangePasswordMutation();

  const handleSubmit = async(event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle password change logic here
    try {
      await changePassword({ old_password:oldPassword, new_password: newPassword })
    .then((res:any) => {
      if(res?.data?.message ==="success"){
        alert("Password changed successfully");
        setoldPassword("")
        setNewPassword("")
      }
    })
    } catch (error) {
      alert("Password change failed");
    }
   

  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          label="Curren Password"
          name="currenPassword"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setoldPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="New Password"
          name="newPassword"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Change Password
        </Button>
      </form>
    </Container>
  );
};

const Wrapped = () => ReduxWrapper({ Component: ChangePassword });
export default Wrapped;