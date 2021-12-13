import { CSSProperties, FC } from "react";
import { Input, Label } from "reactstrap";
import { InputType } from "reactstrap/es/Input";

interface Props {
  type: InputType;
  value: string | string[] | number;
  name: string;
  labelName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multipleSelect?: boolean;
}

const styles: CSSProperties = {
  fontWeight: "300",
};

export const CustomInput: FC<Props> = ({
  onChange,
  type,
  name,
  value,
  labelName,
  children,
  multipleSelect,
}) => (
  <div className="my-2">
    <Label style={{ fontFamily: "Lato" }}>{labelName}</Label>
    <Input
      type={type}
      multiple={multipleSelect}
      bsSize="sm"
      style={styles}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
    >
      {children}
    </Input>
  </div>
);
