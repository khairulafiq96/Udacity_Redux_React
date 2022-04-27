import { element } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
  render() {
    const {question} = this.props;

    function testVal () {
        if(question){
            //console.log(question.optionOne.text)
            return <p>Would you rather...
                         {question.optionOne.text}  OR   {question.optionTwo.text}  </p>
        } else {
            return <p>Question is not available</p>
        }

    }

    return (
      <div>
          <div>
            <img src={this.props.authorPic} ></img>
            {this.props.author} wants to know.....
          </div>
          {testVal()}
          
      </div>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];

  return {
    questions,
    question,
    users,
  };
}
export default connect(mapStateToProps)(Question);
