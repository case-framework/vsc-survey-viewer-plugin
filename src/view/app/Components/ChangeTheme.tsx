import * as React from "react";
import { ThemeType } from "../AppConstants";

interface ChangeThemeProps {
  onThemeChange: (value: ThemeType) => void;
  selectedTheme: ThemeType;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeTheme: React.FC<ChangeThemeProps> = (props) => {
  return (
    <div className="dropdown nav-item">
      <button
        className="btn btn-secondary dropdown-toggle  shadow-none"
        type="button"
        id="ChangeTheme"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Change Theme
      </button>
      <div className="dropdown-menu" aria-labelledby="ChangeTheme">
        <button
          className={`${
            props.selectedTheme === ThemeType.defaultTheme ? "fw-bold" : ""
          } dropdown-item text-center `}
          type="button"
          onClick={() => {
            props.onThemeChange(ThemeType.defaultTheme);
          }}
        >
          Default Theme 
        </button>
        <div className="dropdown-divider"></div>
        <button
          className={`${
            props.selectedTheme === ThemeType.tekenradarTheme ? "fw-bold" : ""
          } dropdown-item text-center `}
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
