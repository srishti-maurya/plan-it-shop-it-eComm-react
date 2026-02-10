interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

export function Checkbox({ checked, label, onChange }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-secondary"
      />
      {label}
    </label>
  );
}
