import { Checkbox, Typography } from "@mui/material";
import { useState, type ReactElement } from "react";
import MiddleComponent from "./MiddleComponent";

export function TopComponent(): ReactElement {
  const dataToRender = [
    { title: "Element one", childIds: [1, 2, 3, 4, 5] },
    { title: "Element two", childIds: [6, 7, 8, 9, 10] },
    { title: "Element three", childIds: [11, 12, 13, 14, 15] },
    { title: "Element four", childIds: [16, 17, 18, 19, 20] },
  ];

  const allChildIds = dataToRender.flatMap((dataItem) => {
    return dataItem.childIds;
  });

  const [checkedElements, setCheckedElements] = useState<number[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedElements(allChildIds);
    } else {
      setCheckedElements([]);
    }
  };

  const checkboxIsChecked = allChildIds.every((childId) =>
    checkedElements.includes(childId)
  );
  const checkboxIsPartiallyChecked = allChildIds.some((childId) =>
    checkedElements.includes(childId)
  );

  return (
    <>
      <Typography>This is the top level</Typography>
      <Checkbox
        onChange={handleCheckboxChange}
        checked={checkboxIsChecked}
        indeterminate={!checkboxIsChecked && checkboxIsPartiallyChecked}
      />
      {dataToRender.map((dataItem) => (
        <MiddleComponent
          dataItem={dataItem}
          key={dataItem.title}
          checkedState={[checkedElements, setCheckedElements]}
        />
      ))}
    </>
  );
}
