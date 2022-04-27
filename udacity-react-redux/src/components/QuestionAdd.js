import React, {Component} from 'react'
import { handleNewQuestion } from '../actions/common';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class QuestionAdd extends Component {

    state = {
        optionOne: "",
        optionTwo: "",
        toHome: false,
      };

    
    handleOptionOne = (e) => {
    let optionOne = e.target.value;

    this.setState(() => ({
        optionOne: optionOne,
    }));
    };

    handleOptionTwo = (e) => {
        let optionTwo = e.target.value;
    
        this.setState(() => ({
          optionTwo: optionTwo,
        }));
      };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOne, optionTwo} = this.state
        const {dispatch, signedInUser} = this.props

        dispatch(handleNewQuestion(signedInUser, optionOne, optionTwo)).then(()=>
            this.setState(()=>({
                optionOne: "",
                optionTwo: "",
                toHome:true
            })))
    }
    

    render(){
        const { optionOne, optionTwo, signedInUser } = this.state;

        
    if (this.state.toHome === true) return <Redirect to="/" />;

    if (signedInUser === null) {
      return <Redirect to="/" />;
    } 

        return (
            <div>
                Add New Question
                <p>Would you rather...</p>

                <form>
                    <input 
                        type='text'
                        placeholder='Enter Option one'
                        value={optionOne}
                        onChange={this.handleOptionOne}></input>
                    
                    <p>OR</p>

                    <input 
                        type='text'
                        placeholder='Enter Option two'
                        value={optionTwo}
                        onChange={this.handleOptionTwo}></input>
                    <br></br>
                    <br></br>
                    <button
                        onClick={this.handleSubmit}
                        disabled={optionOne === "" || optionTwo === "" || optionOne === optionTwo}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ signedInUser }) {
    return { signedInUser };
  }

export default connect(mapStateToProps)(QuestionAdd)