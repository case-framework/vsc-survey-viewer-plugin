import * as React from "react";
import { AlertBox, SurveyView} from 'case-web-ui';
import { dateLocales, SurveyViewCred } from "./model";

  
const SurveySimulator: React.FC<SurveyViewCred> = (props) => {
    return (
        <div className="col-12 col-lg-8 offset-lg-2"
                    //style={{ minHeight: 'calc()' }}
                    >
                        {props.surveyAndContext ?
                            <SurveyView
                                loading={false}
                                showKeys={props.config.showKeys}
                                survey={props.surveyAndContext.survey}
                                context={props.surveyAndContext.context}
                                prefills={props.prefills}
                                languageCode={props.selectedLanguage ? props.selectedLanguage : 'en'}
                                onSubmit={(responses,) => {
                                    console.log(responses);
                                }}
                                nextBtnText={props.config.texts.nextBtn}
                                backBtnText={props.config.texts.backBtn}
                                submitBtnText={props.config.texts.submitBtn}
                                invalidResponseText={props.config.texts.invalidResponseText}
                                dateLocales={dateLocales}
                            /> :
                            <AlertBox type="danger"
                                useIcon={true}
                                content={props.config.texts.noSurveyLoaded}
                            />
                        }
                    </div>
      );

};

export default SurveySimulator;
