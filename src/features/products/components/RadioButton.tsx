interface RadioButtonProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export function RadioButton({ label, checked, onChange }: RadioButtonProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm dark:text-slate-200">
      <input
        type="radio"
        name="rating"
        checked={checked}
        onChange={onChange}
        className="accent-secondary"
      />
      {label}
    </label>
  );
}
