import React from "react";
import { Stack, DefaultPalette } from "@fluentui/react";

import AuthProvider from "./providers/AuthProvider";
import Navigation from "./navigation";

const containerStackTokens = { childrenGap: 5, minHeight: window.innerWidth };
const stackItemStyles = {
  root: {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    padding: 0,
    margin: 0,
    minHeight: window.innerHeight,
  },
};

function App() {
  return (
    <AuthProvider>
      <Stack tokens={containerStackTokens} styles={stackItemStyles}>
        <Navigation />
      </Stack>
    </AuthProvider>
  );
}

export default App;
