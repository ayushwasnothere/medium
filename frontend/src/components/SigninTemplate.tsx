import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { ErrorBox } from "../components/ErrorBox";
import { InputBoxV2 } from "../components/InputBoxV2";
import { SigninInput } from "@citxruzz/medium-common";
import { AuthTemplate } from "../components/AuthTemplate";
import axios from "axios";
import { AuthHeader } from "./AuthHeader";
import { BACKEND_URL } from "../config";
import { useAuth } from "../hooks/useAuth";

export const SigninTemplate = () => {
  const { login } = useAuth();
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const [displayError, setDisplayError] = useState({
    err: false,
    message: "",
  });

  return (
    <AuthTemplate>
      <AuthHeader
        heading="Welcome"
        subheading="Enter your email and password to access your accoung"
      />
      <div className="flex flex-col justify-center items-center w-full gap-6">
        <InputBoxV2
          placeholder="Email"
          onChange={(e) => {
            setPostInputs({ ...postInputs, email: e.target.value });
          }}
        />
        <InputBoxV2
          placeholder="Password"
          onChange={(e) => {
            setPostInputs({ ...postInputs, password: e.target.value });
          }}
        />
        <ErrorBox errObject={displayError} />
      </div>
      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <Button
          label="Sign up"
          onClick={async () => {
            try {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/user/signin`,
                postInputs,
              );
              if (res.data.jwt) {
                await login(res.data.jwt);
              }
            } catch (err) {
              if (axios.isAxiosError(err)) {
                if (err.response?.data.error) {
                  setDisplayError({
                    err: true,
                    message: err.response.data.error,
                  });
                } else {
                  setDisplayError({
                    err: true,
                    message: "Internal error. Please try again later",
                  });
                }
              }
            }
          }}
        />
        <BottomWarning
          label="Dont have an account? "
          link="/signup"
          linkText="Register"
        />
      </div>
    </AuthTemplate>
  );
};
