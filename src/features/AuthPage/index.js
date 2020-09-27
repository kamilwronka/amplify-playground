import React, { useState } from "react";
import { Stack, DefaultButton, DefaultPalette } from "@fluentui/react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SCREENS = {
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
};

const mainStackStyles = {};

const stackItemStyles = {
  root: {
    width: 400,
    background: DefaultPalette.white,
    padding: "20px 40px",
    marginTop: 20,
    boxSizing: "border-box",
  },
};

export default function AuthPage() {
  const [screen, setScreen] = useState(SCREENS.SIGNIN);

  const toggleScreen = (screen) => () => {
    setScreen(screen);
  };

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.SIGNIN:
        return <SignIn />;
      case SCREENS.SIGNUP:
        return <SignUp />;
      default:
        return <SignIn />;
    }
  };

  return (
    <Stack align="center" styles={mainStackStyles}>
      <Stack.Item align="center" styles={stackItemStyles}>
        <DefaultButton
          text="Sign in"
          onClick={toggleScreen(SCREENS.SIGNIN)}
          style={{ margin: 10 }}
        />
        <DefaultButton
          text="Sign up"
          onClick={toggleScreen(SCREENS.SIGNUP)}
          style={{ margin: 10 }}
        />
        {renderScreen()}
      </Stack.Item>
    </Stack>
  );
}
