import { Box, TextField, Button } from "@material-ui/core";
import React from "react";
import Register from "./Register";

export const CrashPage = () => {
  return (
    <Box
      display="grid"
      justifyContent="center"
      bgcolor="white"
      width="30%"
      marginX="auto"
      padding="2rem"
      border="rounded"
    >
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </form>
      <Button type="submit" fullWidth variant="contained" color="primary">
        Sign In
      </Button>
      <Register />
    </Box>
  );
};
