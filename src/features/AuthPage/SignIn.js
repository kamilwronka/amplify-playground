import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, PrimaryButton, Stack } from "@fluentui/react";
import { Auth } from "aws-amplify";
import useAuth from "../../hooks/useAuth";

const stackStyles = {
  root: {
    margin: 10,
  },
};

const stackTokens = {
  childrenGap: 10,
};

const INITIAL_VALUES = {
  username: "",
  password: "",
};

export default function SignIn() {
  const { authorize } = useAuth();

  async function signIn({ username, password }, { setSubmitting }) {
    setSubmitting(true);
    try {
      await Auth.signIn(username, password);
      authorize(true);
    } catch (error) {
      console.log("error signign in: ", error);
    }
    setSubmitting(false);
  }

  return (
    <Formik onSubmit={signIn} initialValues={INITIAL_VALUES}>
      {({ isSubmitting }) => (
        <Form>
          <Stack vertical styles={stackStyles} tokens={stackTokens}>
            <Field
              name="username"
              placeholder="Username or email"
              type="text"
              as={TextField}
            />
            <Field name="password" placeholder="Password" as={TextField} />
            <PrimaryButton
              text="Sign in"
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: 40 }}
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
