"use client";

import GradientCircularProgress from "@Components/CircularProgress/GradientCircularProgress";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import ReduxWrapper from "@Redux/Provider";
import { useChangePasswordMutation } from "@Redux/services/users";
import React from "react";
import { enqueueSnackbar } from "notistack";

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
      await changePassword({ old_password: oldPassword, new_password: newPassword }).then((res: any) => {
        if (res?.data?.message === "success") {
          enqueueSnackbar("Password changed successfully", { variant: "success" });
          setoldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setConfirmPasswordError(false);
        } else {
          enqueueSnackbar("Error changing password", { variant: "error" });
        }
      });
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
