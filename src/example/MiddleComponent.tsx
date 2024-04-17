import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Typography,
} from "@mui/material";
import { FC } from "react";
import BottomComponent from "./BottomComponent";

type MiddleComponentProps = {
  dataItem: { title: string; childIds: number[] };
  checkedState: [number[], React.Dispatch<React.SetStateAction<number[]>>];
};

const MiddleComponent: FC<MiddleComponentProps> = ({
  dataItem,
  checkedState,
}) => {
  const [checkedElements, setCheckedElements] = checkedState;
  const { title, childIds } = dataItem;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedElements((previousValue) => [...previousValue, ...childIds]);
    } else {
      setCheckedElements((previouslyCheckedElements) =>
        previouslyCheckedElements.filter(
          // Go through all values that are already checked. If the value is NOT contained in
          // THIS components childIds (e.g. it's under another component), keep it, otherwise,
          // remove it from the new array of checked elements
          (previouslyCheckedElement) =>
            !childIds.includes(previouslyCheckedElement)
        )
      );
    }
  };

  const checkboxIsChecked = childIds.every((childId) =>
    checkedElements.includes(childId)
  );
  const checkboxIsPartiallyChecked = childIds.some((childId) =>
    checkedElements.includes(childId)
  );

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{title}</Typography>
        <Checkbox
          onChange={handleCheckboxChange}
          checked={checkboxIsChecked}
          indeterminate={!checkboxIsChecked && checkboxIsPartiallyChecked}
        />
      </AccordionSummary>
      <AccordionDetails>
        {childIds.map((childId) => (
          <BottomComponent
            childId={childId}
            checkedState={checkedState}
            key={childId}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default MiddleComponent;
