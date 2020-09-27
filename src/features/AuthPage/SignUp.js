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
  email: "",
  password: "",
};

export default function SignUp() {
  const { authorize } = useAuth();

  async function signUp({ username, password, email }, { setSubmitting }) {
    setSubmitting(true);
    try {
      console.log(email, password);
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);
      authorize(true);
    } catch (error) {
      console.log("error signing up: ", error);
    }
    setSubmitting(false);
  }

  return (
    <Formik onSubmit={signUp} initialValues={INITIAL_VALUES}>
      {({ isSubmitting }) => (
        <Form>
          <Stack vertical styles={stackStyles} tokens={stackTokens}>
            <Field
              placeholder="Username"
              name="username"
              type="text"
              as={TextField}
            />
            <Field
              placeholder="E-mail address"
              name="email"
              type="email"
              as={TextField}
            />
            <Field
              placeholder="Password"
              name="password"
              type="password"
              as={TextField}
            />
            <PrimaryButton
              text="Sign up"
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
