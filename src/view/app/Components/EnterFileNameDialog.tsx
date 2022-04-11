import * as React from "react";

interface EnterFileNameDialogProps {
  giveCommandToExtention: (command: string, data: string) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const EnterFileNameDialog: React.FC<EnterFileNameDialogProps> = (props) => {
  const [fileName, setFileName] = React.useState("");
  return (
    <div
      className="modal fade"
      id="EnterFileNameDialog"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="DialogTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="DialogTitle">
              Modal title
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {
                props.giveCommandToExtention("createNewFile", fileName);
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
