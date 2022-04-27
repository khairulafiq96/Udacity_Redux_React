import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";

class QuestionResult extends Component {

    render(){

        const { users, questions, signedInUser, id } = this.props;
        const question = questions[id];
        const optionOne = question.optionOne;
        const optionTwo = question.optionTwo;
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        const optionOnePercent = Math.floor((optionOne.votes.length / totalVotes) * 100);
        const optionTwoPercent = Math.floor((optionTwo.votes.length / totalVotes) * 100);
        const yourVote = users[signedInUser].answers[question.id];

        if (signedInUser === null) {
            return <Redirect to="/" />;
          }
      
          if (!questions[id]) {
            return <Redirect to="/NotFound" />;
          }

        return (
            <div>
                <br></br>
                <img
                    src={users[question.author].avatarURL}
                    alt={`Avatar of ${users[question.author].name}`}
                    className="avatar-img"
                />
                <br></br>
                Question : {users[question.author].name} wants to know...
                <br></br>
                <br></br>
                Results
                <br></br>
                Would you rather
                
                <div>Option 1 : {optionOne.text} ||  Percent : {optionOnePercent} % 
                    {yourVote==='optionOne' && ( <b> || You Voted</b>)}</div>
                <div>Option 2 : {optionTwo.text} ||  Percent : {optionTwoPercent} % 
                    {yourVote==='optionTwo' && ( <b> || You Voted</b>)}</div>
                
            </div>
        )
    }
}

function mapStateToProps({ users, signedInUser, questions }) {
    return {
      users,
      signedInUser,
      questions,
    };
  }

export default connect(mapStateToProps)(QuestionResult)