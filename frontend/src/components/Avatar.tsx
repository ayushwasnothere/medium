interface AvatarType {
  text: string;
  size: "small" | "big";
}

export const Avatar = ({ text, size }: AvatarType) => {
  return (
    <div
      className={`flex ${size == "small" ? "size-7 text-sm" : "size-10 text-md"} rounded-full bg-slate-100 justify-center items-center font-semibold`}
    >
      {text[0].toUpperCase()}
    </div>
  );
};
