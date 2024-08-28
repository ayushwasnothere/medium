import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";

interface AuthHeaderType {
  heading: string;
  subheading: string;
}
export const AuthHeader = ({ heading, subheading }: AuthHeaderType) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <Heading>{heading}</Heading>
      <SubHeading>{subheading}</SubHeading>
    </div>
  );
};
