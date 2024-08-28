import { Quote } from "../components/Quote";
import { SignupTemplate } from "../components/SignupTemplate";

export const Signup = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2">
      <SignupTemplate />
      <Quote />
    </div>
  );
};
