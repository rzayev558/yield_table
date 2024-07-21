import Input from "@mui/material/Input";

interface YieldClassInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
}
export const YieldClassInput: React.FC<YieldClassInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter yield class"
    />
  );
};
