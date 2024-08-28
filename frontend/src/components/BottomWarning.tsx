import { Link } from "react-router-dom";

interface BottomWarningType {
  label: string;
  link: string;
  linkText: string;
}

export const BottomWarning = ({ label, link, linkText }: BottomWarningType) => {
  return (
    <div className="flex text-gray-400 text-xs md:text-sm">
      {label}
      <Link className="underline" to={link}>
        {linkText}
      </Link>
    </div>
  );
};
