import { generateRandomId } from "../../utils/StringUtils";

interface Props {
  show: boolean;
  number: number;
  placeholderElement: JSX.Element;
}

export const Placeholder = ({ show, number, placeholderElement }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <>
      {Array.from(Array(number).fill(1)).map((item) => {
        return <div key={generateRandomId()}>{placeholderElement}</div>;
      })}
    </>
  );
};
