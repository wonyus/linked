"use client";

import GradientCircularProgress from "@Components/CircularProgress/GradientCircularProgress";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import ReduxWrapper from "@Redux/Provider";
import { useChangePasswordMutation } from "@Redux/services/users";
import React from "react";

const ChangePassword = () => {
  const [oldPassword, setoldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const [changePassword, result] = useChangePasswordMutation();
  console.log(result);

  React.useEffect(() => {
    if (result.isError) {
      const err: any = result.error;
      setError(err?.data?.error);
      setConfirmPasswordError(true);
    }
  }, [result.isError]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle password change logic here
    if (newPassword === "") {
      setError("Password cannot be empty");
      setConfirmPasswordError(true);
      return;
    } else if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setConfirmPasswordError(true);
      return;
    } else {
      try {
        await changePassword({ old_password: oldPassword, new_password: newPassword }).then((res: any) => {
          if (res?.data?.message === "success") {
            alert("Password changed successfully");
            setoldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setConfirmPasswordError(false);
          }
        });
      } catch (error) {
        alert("Password change failed");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <FormLabel component="legend">Change Password</FormLabel>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
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
          <TextField
            type="password"
            label="Confirm New Password"
            name="confirmNewPassword"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => {
              if (confirmPasswordError) {
                setConfirmPasswordError(false);
              }
              setConfirmPassword(e.target.value);
            }}
          />
          {confirmPasswordError && <FormHelperText error={confirmPasswordError}>{error}</FormHelperText>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 1 }}>
            {result.isLoading ? <GradientCircularProgress size={30} /> : "Change Password"}
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};

const Wrapped = () => ReduxWrapper({ Component: ChangePassword });
export default Wrapped;
