import * as React from "react";
import { ThemeType } from "../AppConstants";
import "../Css/Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface ChangeThemeProps {
  onThemeChange: (value: ThemeType) => void;
  selectedTheme: ThemeType;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeTheme: React.FC<ChangeThemeProps> = (props) => {
  return (
    <div className="dropdown nav-item">
      <button
        className="btn toolBarBg dropdown-toggle shadow-none changeThemeBtn fw-bold iconsAndTextAlign"
        type="button"
        id="ChangeTheme"
        title={"Change Theme: " + props.selectedTheme}
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <FontAwesomeIcon
          icon={faImage}
          style={{ width: "20px", height: "20px", paddingRight: "0.3rem" }}
        />
        Theme
      </button>
      <div
        className="dropdown-menu text-center overflow-auto toolBarDropdownBg"
        aria-labelledby="ChangeTheme"
        style={{ minWidth: "182px", maxHeight: "260px" }}
      >
        <button
          className={`${
            props.selectedTheme === ThemeType.defaultTheme
              ? "fw-bold themeIcon"
              : ""
          } dropdown-item btn-custom`}
          type="button"
          style={{ paddingTop: "0.2rem", paddingBottom: "0.2rem" }}
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
          } dropdown-item btn-custom`}
          type="button"
          style={{ paddingTop: "0.2rem", paddingBottom: "0.2rem" }}
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
