import React from "react";
import { DefaultButton, Stack } from "@fluentui/react";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const stackStyles = {
  root: {
    padding: 20,
    width: "100%",
    boxSizing: "border-box",
  },
};

export default function Navbar() {
  const { authorized, logout } = useAuth();

  return (
    <Stack horizontal horizontalAlign="space-between" styles={stackStyles}>
      <Stack.Item horizontalAlign="start">
        <div>ydzbj </div>
      </Stack.Item>
      <Stack.Item horizontalAlign="end">
        {authorized ? (
          <DefaultButton text="Log out" onClick={logout} />
        ) : (
          <Link to="/auth">
            <DefaultButton text="Sign in" />
          </Link>
        )}
      </Stack.Item>
    </Stack>
  );
}
