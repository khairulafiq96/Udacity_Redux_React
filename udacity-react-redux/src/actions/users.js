export const RECEIVE_USERS = "RECEIVE_USERS";
export const SIGNIN_USERS = "SIGNIN_USERS";
export const SAVE_USER_ANSWER = "SAVE_USER_ANSWER";
export const SAVE_USER_QUESTION = "SAVE_USER_QUESTION";


export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    };
}

export function signInUser(users) {
    return {
        type: SIGNIN_USERS,
        users,
    };
}

export function saveUserAnswer(authedUser,qid, answer){
    return {
        type : SAVE_USER_ANSWER,
        qid,
        authedUser,
        answer
    }
}

export function saveUserQuestion(question) {
    return {
      type: SAVE_USER_QUESTION,
      question,
    };
  }