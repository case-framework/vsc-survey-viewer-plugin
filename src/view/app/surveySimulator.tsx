import * as React from "react";
import { AlertBox, SurveyView} from 'case-web-ui';
import { dateLocales, SurveyViewCred } from "./model";

  
const SurveySimulator: React.FC<SurveyViewCred> = (props) => {
    
  //   constructor(props: any) {
  //     super(props);
  
  //     let initialData = this.props.initialData;
  
  //     let oldState = this.props.vscode.getState();
  //     if (oldState) {
  //       this.state = oldState;
  //     } else {
  //       this.state = { config: initialData };
  //     }
  //   }
  
  //   renderUsers(users: IUser[]) {
  //     return (
  //       <React.Fragment>
  //         <h2>User List :</h2>
  //         <ul className="">
  //           {users && users.length > 0
  //             ? users.map((user, userIndex) => {
  //                 let roles =
  //                   user.roles && user.roles.length > 0
  //                     ? user.roles.join(",")
  //                     : null;
  //                 return (
  //                   <li key={userIndex}>
  //                     {user.name}
  //                     <br />
  //                     Is active : <input type="checkbox" checked={user.active} />
  //                     <br />
  //                     Roles : {roles}
  //                   </li>
  //                 );
  //               })
  //             : null}
  //         </ul>
  //       </React.Fragment>
  //     );
  //   }
  
  //   render() {
  //     return (
  //       <React.Fragment>
  //         <h1>Config name : {this.state.config.name}</h1>{" "}
  //         {this.state.config.description}
  //         {this.renderUsers(this.state.config.users)}
  //         <br />
  //       </React.Fragment>
  //     );
  // }   

  
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
