import { Quote } from "../components/Quote";
import { SigninTemplate } from "../components/SigninTemplate";

export const Signin = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2">
      <Quote />
      <SigninTemplate />
    </div>
  );
};
