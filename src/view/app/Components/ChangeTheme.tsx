import * as React from "react";
import { ThemeType } from "../AppConstants";


interface ChangeThemeProps {
  onThemeChange: (value: ThemeType) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeTheme: React.FC<ChangeThemeProps> = (props) => {
  return (
    <div
      className="dropdown nav-item"
      style={{
        width: "20%",
        minWidth: "130px",
        height: "44px",
        paddingRight: "1rem",
      }}
    >
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="ChangeTheme"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Change Theme
      </button>
      <div
        className="dropdown-menu"
        aria-labelledby="ChangeTheme"
        style={{ width: "170px" }}
      >
        <button
          className="dropdown-item text-center"
          type="button"
          onClick={() => {
            props.onThemeChange(ThemeType.defaultTheme);
          }}
        >
          Default Theme
        </button>
        <div className="dropdown-divider"></div>
        <button
          className="dropdown-item text-center"
          type="button"
          onClick={() => {
            props.onThemeChange(ThemeType.tekenradarTheme);
          }}
        >
          Tekenradar Theme
        </button>
      </div>
    </div>
  );
};

export default ChangeTheme;
