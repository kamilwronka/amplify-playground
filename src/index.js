import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Amplify, { Auth } from "aws-amplify";
import { COGNITO, API } from "./config";

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: COGNITO.REGION,
        userPoolId: COGNITO.USER_POOL_ID,
        userPoolWebClientId: COGNITO.APP_CLIENT_ID,
    },
    API: {
        endpoints: [
            {
                name: "memes",
                endpoint: `${API.BASE_API_URL}/memes`,
            },
            {
                name: "memes-authorized",
                endpoint: `${API.BASE_API_URL}/memes`,
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
