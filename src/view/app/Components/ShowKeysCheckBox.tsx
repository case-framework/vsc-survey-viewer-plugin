import { Checkbox } from "case-web-ui";
import * as React from "react";

interface ShowsKeysCheckBoxProps {
  currentCheckBoxStatus: boolean;
  onCheckBoxStausChange: (newStaus: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShowKeysCheckBox: React.FC<ShowsKeysCheckBoxProps> = (props) => {
  return (
    <div
      className="nav-item "
      style={{
        width: "180px",
        paddingRight: "1rem",
        paddingLeft: "1rem",
        paddingTop: "0.5rem",
      }}
    >
      <Checkbox
        id="show-keys-checkbox"
        name="show-keys-checkbox"
        checked={props.currentCheckBoxStatus}
        onChange={(value) => {
          props.onCheckBoxStausChange(value);
        }}
        label="Show keys"
      />
    </div>
  );
};

export default ShowKeysCheckBox;
