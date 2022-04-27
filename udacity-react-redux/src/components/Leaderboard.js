import React , { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import styles from '../styles/style.module.css'

class Leaderboard extends Component {
    render(){

        const { leaderData, signedInUser } = this.props;

        if (signedInUser === null) {
            return <Redirect to="/" />;
          }

        return(
            <div>
                <ul>
                    {leaderData.map((user)=>(
                        <li key={user.id}>
                            <div>
                                <img className={styles.profilePic} src={user.avatarURL} alt={`Avatar of ${user.userName}`}></img>
                                <br></br>
                                {user.userName}
                                <br></br>
                                <br></br>
                                Answered Questions : {user.numAnswered}
                                <br></br>
                                <br></br>
                                Created Questions : {user.numQuestionCreated}
                                <br></br>
                                <br></br>
                                Score : {user.numAnswered + user.numQuestionCreated}
                                <br></br>
                                <br></br>
                            </div>
                        </li>
                    ))}
                </ul>
               
            </div>
        )
    }

}

function mapStateToProps({users}){
    const leaderData = Object.values(users).map((user)=>({
        id : user.id,
        userName : user.name,
        avatarURL: user.avatarURL,
        numAnswered: Object.values(user.answers).length,
        numQuestionCreated: user.questions.length,
        score: Object.values(user.answers).length + user.questions.length
    }))

    leaderData.sort((a,b)=> b.score - a.score)

    return {
        leaderData
    }
}

export default connect(mapStateToProps)(Leaderboard)