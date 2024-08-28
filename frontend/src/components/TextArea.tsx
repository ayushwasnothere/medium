interface TextAreaType {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ label, placeholder, onChange }: TextAreaType) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <textarea
        onChange={onChange}
        className="flex w-full rounded border border-slate-200 px-4 py-3 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[300px]"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
