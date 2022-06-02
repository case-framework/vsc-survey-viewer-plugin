import * as React from "react";
import "../Css/Toolbar.css";

interface ShowsKeysCheckBoxProps {
  currentCheckBoxStatus: boolean;
  onCheckBoxStausChange: (newStaus: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShowKeysCheckBox: React.FC<ShowsKeysCheckBoxProps> = (props) => {
  return (
    <div className="nav-item ">
      <div className="form-check btn btn-custom">
        <input
          className="form-check-input shadow-none "
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked={props.currentCheckBoxStatus}
          onChange={() => {
            props.onCheckBoxStausChange(!props.currentCheckBoxStatus);
          }}
        />
        <label className="form-check-label fw-bold" htmlFor="flexCheckChecked">
          Show Keys
        </label>
      </div>
    </div>
  );
};

export default ShowKeysCheckBox;
