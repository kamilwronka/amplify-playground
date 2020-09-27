import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify, { Auth } from "aws-amplify";
import { COGNITO } from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: COGNITO.REGION,
    userPoolId: COGNITO.USER_POOL_ID,
    userPoolWebClientId: COGNITO.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      // {
      //   name: "TestLambda",
      //   endpoint:
      //     "https://vnjfc4v0fi.execute-api.eu-central-1.amazonaws.com/dev",
      //   custom_header: async () => {
      //     return {
      //       Authorization: `Bearer ${(await Auth.currentSession())
      //         .getIdToken()
      //         .getJwtToken()}`,
      //     };
      //   },
      // },
      {
        name: "memes",
        endpoint:
          "https://vnjfc4v0fi.execute-api.eu-central-1.amazonaws.com/dev/memes",
      },
      {
        name: "memes-authorized",
        endpoint:
          "https://vnjfc4v0fi.execute-api.eu-central-1.amazonaws.com/dev/memes",
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
    ],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
