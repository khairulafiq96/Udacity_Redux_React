import react, {Component} from 'react'
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from '../actions/common';
import { Redirect, withRouter } from "react-router-dom";


class QuestionAnswer extends Component {
state = {
    option : "",
    answered: false
}

handleChange = (e) => {
    this.setState(() => ({
      option: e.target.value,
    }));
  };

handleVote = (e) => {
    e.preventDefault();

    const {dispatch, signedInUser, id, question} = this.props
    const qid = question.id

    dispatch(handleSaveQuestionAnswer({
                authedUser : signedInUser,
                qid : qid,
                answer : this.state.option
    }))

    this.props.history.push(`/questions/${id}`)
}

    render(){
        const { users, id, questions } = this.props;

        if (!questions[id]) {
            return <Redirect to="/NotFound" />;
          }

        return (
            <div>
                 <img
                    src={users[questions[id].author].avatarURL}
                    alt={`Avatar of ${users[questions[id].author].name}`}
                 />
                    <br></br>
                <b>{users[questions[id].author].name} wants to know...</b>
                
                <form>
                    <div>
                    <p>Would you rather</p>
                        <input
                            id="one"
                            value="optionOne"
                            type="radio"
                            name="option"
                            className="radio-btn"
                            onChange={this.handleChange}
                        />
                        {this.props.question.optionOne.text} OR <br></br>

                        <input
                            id="two"
                            value="optionTwo"
                            type="radio"
                            name="option"
                            className="radio-btn"
                            onChange={this.handleChange}
                        />
                        {this.props.question.optionTwo.text}

                        <div>
                            <button
                                type='submit'
                                onClick={this.handleVote}
                                disabled={this.state.option === "" || this.state.option ===""}
                            >Submit</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ signedInUser, users, questions }, { id }) {
    const question = questions[id];
  
    return {
      signedInUser,
      users,
      questions,
      question,
      id,
    };
  }

export default withRouter(connect(mapStateToProps)(QuestionAnswer))