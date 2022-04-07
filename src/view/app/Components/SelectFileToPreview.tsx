import * as React from "react";
import { OutputFileStructure } from "../model";

interface SelectFileDropdownProps {
    giveCommandToExtention: (command: string, data: string) => void;
    setChangedSelectTheFileBtnText: (newText: string) => void;
    changedSelectTheFileBtnText: string;
    setOutPutDirContentValue: (value: boolean) => void;
    outPutDirContentValue: boolean;
    onChangedSurveyViewCred: () => void;

}

// eslint-disable-next-line @typescript-eslint/naming-convention
const SelectFileToPreview: React.FC<SelectFileDropdownProps> = (props) => {

    const setDropdowns = (items: OutputFileStructure): React.ReactNode => {
        return items.directoryContent.map((item) => {
            return (
                <div>
                    <div className="dropdown-divider"></div>
                    <p className="h5" style={{ paddingLeft: "1rem" }}>{item.surveyName}</p>

                    {setDropdownItems(item.surveyFiles, item.surveyPath)}

                </div>

            );
        });
    };

    const setDropdownItems = (items: string[], directoryPath: string): React.ReactNode => {
        return items.map((item) => {
            return (
                <button
                    className="dropdown-item" style={{ paddingLeft: "3rem" }}
                    type="button" id={item}
                    onClick={() => {
                        props.giveCommandToExtention('fileSelectedForPreview', directoryPath + "/" + item);
                        props.giveCommandToExtention('selectedFileToDetectChanges', directoryPath + "/" + item);
                        const intervalId = setInterval(() => {
                            if (window.surveyData) {
                                props.setChangedSelectTheFileBtnText(item.substring(0, item.lastIndexOf('.')).replace('_', ' '));
                                props.onChangedSurveyViewCred();
                                clearInterval(intervalId);
                            }


                        }, 1000);
                    }}>{item.substring(0, item.lastIndexOf('.')).replace('_', ' ')}</button>

            );

        });
    };

    return (
        <div className="dropdown" style={{ width: "25%", minWidth: "214px" }}>
            <button className="btn btn-secondary dropdown-toggle"
                type="button" id="SelectFileDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                onClick={() => {
                    props.setOutPutDirContentValue(false);
                    props.giveCommandToExtention('getOutputFileContent', "");
                    const intervalId = setInterval(() => {
                        if (window.outPutDirContent.directoryContent.length && window.outPutDirContent.isOutputDirMissing === false) {

                            props.setOutPutDirContentValue(true);
                            clearInterval(intervalId);
                        } else if (!window.outPutDirContent.directoryContent.length && window.outPutDirContent.isOutputDirMissing === true) {

                            props.setOutPutDirContentValue(true);
                            props.giveCommandToExtention('missingOutputDirError', "The Output Directory is not yet generated");
                            clearInterval(intervalId);
                        }
                        console.log(window.outPutDirContent);

                    }, 1000);
                }}> {props.changedSelectTheFileBtnText}
            </button>

            <div className="dropdown-menu overflow-auto" aria-labelledby="SelectFileDropdown" style={{ maxHeight: "280px", background: "white" }}>
                {props.outPutDirContentValue ? setDropdowns(window.outPutDirContent) : <div className="text-center" style={{ width: "214px" }}><div className="spinner-border text-secondary" style={{ width: "2rem", height: "2rem" }} role="status">
                    <span className="sr-only"></span>
                </div></div>}
            </div>
        </div>
    );
};

export default SelectFileToPreview;