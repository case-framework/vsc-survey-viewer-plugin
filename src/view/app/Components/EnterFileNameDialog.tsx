import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface EnterFileNameDialogProps {
  giveCommandToVscode: (command: string, data: string) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const EnterFileNameDialog: React.FC<EnterFileNameDialogProps> = (props) => {
  const [fileName, setFileName] = React.useState("");
  return (
    <div
      className="modal fade "
      id="EnterFileNameDialog"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="DialogTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content" style={{ borderRadius: "0.6rem" }}>
          <div
            className="modal-header"
            style={{
              paddingTop: "0.5rem",
              paddingRight: "0rem",
              paddingLeft: "1.2rem",
              paddingBottom: "0.5rem",
            }}
          >
            <h5 className="modal-title" id="DialogTitle">
              Create a new file
            </h5>
            <button
              type="button"
              className="btn shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
          <div
            className="modal-body"
            style={{
              paddingTop: "1rem",
              paddingRight: "1.2rem",
              paddingLeft: "1.2rem",
              paddingBottom: "1.4rem",
            }}
          >
            <div className="form-group">
              <label htmlFor="EnterFileNameTextfeild">Enter File name</label>
              <input
                type="email"
                style={{ backgroundColor: "#edeff4" }}
                className="form-control"
                onChange={(event) => {
                  setFileName(event.target.value);
                  console.log(event.target.value);
                }}
                id="EnterFileNameTextfeild"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>
          </div>
          <div className="modal-footer p-2">
            <button
              type="button"
              className="btn btn-secondary rounded"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary rounded"
              style={{ marginLeft: "0.937rem" }}
              data-bs-dismiss="modal"
              onClick={() => {
                props.giveCommandToVscode("createNewFile", fileName);
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterFileNameDialog;
