import * as React from "react";

interface ShowsKeysCheckBoxProps {
  currentCheckBoxStatus: boolean;
  onCheckBoxStausChange: (newStaus: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShowKeysCheckBox: React.FC<ShowsKeysCheckBoxProps> = (props) => {
  return (
    <div className="form-check nav-item " style={{
      width:"160px",
      paddingTop: "0.5rem",
      paddingRight: "3rem",
      marginLeft: "1.5rem"
    }}>
  <input className="form-check-input shadow-none " type="checkbox" value="" id="flexCheckChecked" checked={props.currentCheckBoxStatus}  onClick={() => {
          props.onCheckBoxStausChange(!props.currentCheckBoxStatus);
        }}/>
  <label className="form-check-label btn-custom fw-bold" htmlFor="flexCheckChecked">
  Show Keys
  </label>
</div>
    
  );
};

export default ShowKeysCheckBox;
