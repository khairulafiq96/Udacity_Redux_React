import { combineReducers } from "redux";
import users from "./users";
import signedInUser from './signInUser'
import questions from "./questions";

export default combineReducers({
    users,
    signedInUser,
    questions
})