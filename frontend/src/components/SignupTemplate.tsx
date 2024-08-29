import { useMemo, useState } from "react";
import { AuthTemplate } from "../components/AuthTemplate";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { ErrorBox } from "../components/ErrorBox";
import { InputBoxV2 } from "../components/InputBoxV2";
import { SignupInput } from "@citxruzz/medium-common";
import axios from "axios";
import { AuthHeader } from "./AuthHeader";
import { BACKEND_URL } from "../config";
import { useAuth } from "../hooks/useAuth";

export const SignupTemplate = () => {
  const { login } = useAuth();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const passCheck = useMemo(
    () => postInputs.password.length >= 6,
    [postInputs.password],
  );
  const [displayError, setDisplayError] = useState({
    err: false,
    message: "",
  });

  return (
    <AuthTemplate>
      <AuthHeader
        heading="Create an account"
        subheading="Enter your name, email and password to create an account"
      />
      <div className="flex flex-col justify-center items-center w-full gap-6">
        <InputBoxV2
          placeholder="Name"
          onChange={(e) => {
            setPostInputs({ ...postInputs, name: e.target.value });
          }}
        />
        <InputBoxV2
          placeholder="Email"
          onChange={(e) => {
            setPostInputs({ ...postInputs, email: e.target.value });
          }}
        />
        <div className="w-full flex flex-col gap-1">
          <InputBoxV2
            placeholder="Password"
            onChange={(e) => {
              setPostInputs({ ...postInputs, password: e.target.value });
            }}
          />
          <div
            className={`text-xs ${postInputs.password.length === 0 ? "text-gray-400" : passCheck ? "text-green-500" : "text-red-400"}`}
          >
            Atleast 6-characters
          </div>
        </div>
        <ErrorBox errObject={displayError} />
      </div>
      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <Button
          label="Sign up"
          onClick={async () => {
            try {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
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
          label="Already have an account?"
          link="/signin"
          linkText="Login"
        />
      </div>
    </AuthTemplate>
  );
};
