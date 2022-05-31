import * as React from "react";
import "../Css/Toolbar.css";

interface ShowsKeysCheckBoxProps {
  currentCheckBoxStatus: boolean;
  onCheckBoxStausChange: (newStaus: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShowKeysCheckBox: React.FC<ShowsKeysCheckBoxProps> = (props) => {
  return (
    <div className="nav-item " style={{ paddingLeft: "1.5rem" }}>
      <div
        className="form-check "
        style={{
          paddingTop: "0.7rem",
          paddingBottom: "0.6rem",
        }}
      >
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
        <label
          className="form-check-label btn-custom fw-bold"
          htmlFor="flexCheckChecked"
        >
          Show Keys
        </label>
      </div>
    </div>
  );
};

export default ShowKeysCheckBox;
