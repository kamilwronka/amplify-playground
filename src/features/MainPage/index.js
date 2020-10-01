import React from "react";
import { Stack } from "@fluentui/react";

import Navbar from "../../common/layout/Navbar";
import Memes from "./Memes";
import UploadField from "./UploadField";
import useAuth from "../../hooks/useAuth";

const stackTokens = {
    childrenGap: 50,
};

export default function MainPage() {
    const { authorized } = useAuth();

    return (
        <Stack vertical horizontalAlign="center" tokens={stackTokens}>
            <Navbar />
            {authorized && <UploadField />}
            <Memes />
        </Stack>
    );
}
