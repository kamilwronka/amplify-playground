import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

import AuthContext from "../contexts/AuthContext";

const AuthProvider = (props) => {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        Auth.currentSession()
            .then(() => {
                setAuthorized(true);
            })
            .catch(() => setAuthorized(false));
    }, []);

    function authorize(state) {
        setAuthorized(state);
    }

    function logout() {
        Auth.signOut().then(() => setAuthorized(false));
    }

    return (
        <AuthContext.Provider value={{ authorized, authorize, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
