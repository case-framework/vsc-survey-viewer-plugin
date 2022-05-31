import * as React from "react";
import { ThemeType } from "../AppConstants";
import "../Css/Toolbar.css";
import { BsFillFileRichtextFill } from "react-icons/bs";

interface ChangeThemeProps {
  onThemeChange: (value: ThemeType) => void;
  selectedTheme: ThemeType;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeTheme: React.FC<ChangeThemeProps> = (props) => {
  return (
    <div className="dropdown nav-item">
      <button
        className="btn toolBarBg dropdown-toggle shadow-none changeThemeBtn fw-bold"
        type="button"
        id="ChangeTheme"
        title={"Change Theme: " + props.selectedTheme}
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <BsFillFileRichtextFill
          className="themeIcon"
          style={{ width: "24px", height: "24px", marginRight: "0.5rem" }}
        />
        Change Theme
      </button>
      <div
        className="dropdown-menu overflow-auto toolBarDropdownBg"
        aria-labelledby="ChangeTheme"
        style={{ minWidth: "182px", maxHeight: "260px" }}
      >
        <button
          className={`${
            props.selectedTheme === ThemeType.defaultTheme
              ? "fw-bold themeIcon"
              : ""
          } dropdown-item text-center btn-custom`}
          type="button"
          onClick={() => {
            props.onThemeChange(ThemeType.defaultTheme);
          }}
        >
          Default Theme
        </button>
        <div className="dropdown-divider dividerColor"></div>
        <button
          className={`${
            props.selectedTheme === ThemeType.tekenradarTheme
              ? "fw-bold themeIcon"
              : ""
          } dropdown-item text-center btn-custom`}
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
