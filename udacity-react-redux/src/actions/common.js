import { getInitialData,saveQuestionAnswer, saveQuestion } from "../utils/Api";
import { receiveUsers,saveUserAnswer,saveUserQuestion } from "./users";
import { setSignedInUser, signOutUser } from "./signInUser";
import {receiveQuestions,saveAnswer, addQuestion} from '../actions/questions'


let SIGNED_ID = null;

export function handleInitialData(){
    return (dispatch) => {
        return getInitialData().then(({users,questions})=>{
            dispatch(receiveUsers(users))
            dispatch(setSignedInUser(SIGNED_ID));
            dispatch(receiveQuestions(questions))
            dispatch(signOutUser(null));
        })
    }
}

export function handleSaveQuestionAnswer({authedUser, qid, answer}){
    return(dispatch)=> {
        return saveQuestionAnswer({authedUser, qid, answer}).then(()=>{
            dispatch(saveAnswer(authedUser, qid, answer))
            dispatch(saveUserAnswer(authedUser,qid,answer))
        })
    }
}

export function handleNewQuestion(signedInUser, optionOneText, optionTwoText) {
    return (dispatch) => {
      const questionData = {
        author: signedInUser,
        optionOneText,
        optionTwoText,
      };
      return saveQuestion(questionData).then((question) => {
        dispatch(addQuestion(question));
        dispatch(saveUserQuestion(question));
      });
    };
  }