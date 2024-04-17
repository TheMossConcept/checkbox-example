import { Checkbox, Typography } from "@mui/material";
import { FC } from "react";

type BottomComponentProps = {
  childId: number;
  checkedState: [number[], React.Dispatch<React.SetStateAction<number[]>>];
};

const BottomComponent: FC<BottomComponentProps> = ({
  childId,
  checkedState,
}) => {
  const [checkedElements, setCheckedElements] = checkedState;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedElements((previouslyCheckedElement) => [
        ...previouslyCheckedElement,
        childId,
      ]);
    } else {
      setCheckedElements((previouslyCheckedElements) =>
        previouslyCheckedElements.filter(
          (previouslyCheckedElement) => previouslyCheckedElement !== childId
        )
      );
    }
  };

  return (
    <>
      <Typography>{childId}</Typography>
      <Checkbox
        checked={checkedElements.includes(childId)}
        onChange={handleCheckboxChange}
      />
    </>
  );
};

export default BottomComponent;
