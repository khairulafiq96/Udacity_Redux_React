import React, {Component,Fragment } from 'react'
import SignIn from './SignIn';
import { handleInitialData } from '../actions/common';
import { connect } from 'react-redux'
import Question from './Question'
import { Link } from "react-router-dom";

class Dashboard extends Component{
  state = {
    tab : "unanswered"
  }

 myhandleTab =  (value) => {

    let myTab;

    //console.log(value)

    if (value === "unanswered"){
      myTab = "unanswered"
    } else if (value === "answered") {
      myTab = "answered"
    }


    this.setState(() => ({
      tab: myTab,
    }));
  };


  

  render(){

    const {answeredArr, unansweredArr,signedInUser} = this.props
    
    return(
     <div>
          <div>
            <br></br>
            <button onClick={()=> this.myhandleTab("unanswered")}> Unanswered</button>
            <button onClick={()=> this.myhandleTab("answered")}> Answered</button>
            <br></br>
            <br></br>
          </div>
      
        {this.state.tab === "unanswered" ? 
        (<div>
             Unanswered Questions
              <ul>
                {unansweredArr && unansweredArr.map((question) =>(
                  <li key={question.id}>
                      <Question 
                        id={question.id}
                        author={this.props.avatarDetails[question.author].name}
                        authorPic={this.props.avatarDetails[question.author].avatarURL}/>

                      <Link to={{
                              pathname: `questions/${question.id}`,
                                }}>
                      <button>Answer Question</button>
                      <p></p>
                    </Link>


                  </li>
                    
                  
                ))}
              </ul>
          </div>):
          
          (<div>
            Answered Questions
              <ul>
                {answeredArr && answeredArr.map((question) =>(
                  <li key={question}>
                      <Question id={question}
                                author={this.props.avatarDetails[this.props.questions[question].author].name}
                                authorPic={this.props.avatarDetails[this.props.questions[question].author].avatarURL}
                                />
                      <Link to={{
                              pathname: `questions/${question}`,
                                }}>
                      <button>Answer Question</button>
                      <p></p>
                      </Link>
                  </li>
                ))}
              </ul>
          </div>
) }



         
     </div>
    )
  }
}

function mapStateToProps ({users, signedInUser, questions},{id}) {
  const answeredArr = Object.keys(users[signedInUser].answers)
                      .sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
  //console.log(answeredArr)

  
  const unansweredArr = Object.values(questions)
                        .filter((question) => !answeredArr.includes(question.id))
                        .sort((a,b) => b.timestamp - a.timestamp)

  
  const avatarDetails = users

  return {
    answeredArr,
    unansweredArr,
    signedInUser,
    avatarDetails,
    questions,
    id,
  }
}

export default connect(mapStateToProps)(Dashboard);