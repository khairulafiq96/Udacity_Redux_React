import React, { Component } from "react";
import QuestionAnswer from "./QuestionAnswer";
import QuestionResult from "./QuestionResult";
import NotFound from "./NotFound";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ShowQuestion extends Component {
  render() {
    const { answered, id, questions } = this.props;

    if (!questions[id]) {
      return <Redirect to="/NotFound" />;
    }

    return (
      <div>
        {answered === false && <QuestionAnswer id={id} />}
        {answered === true && <QuestionResult id={id} />}
      </div>
    );
  }
}

function mapStateToProps({ signedInUser, questions, users }, props) {
  const { id } = props.match.params;
  let answered = Object.keys(users[signedInUser].answers).includes(id);
  return {
    id,
    answered,
    questions
  };
}

export default connect(mapStateToProps)(ShowQuestion);