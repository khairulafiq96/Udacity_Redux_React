import React, {Component} from 'react';
import { connect } from "react-redux";
import DropdownButton from 'react-bootstrap/DropdownButton'
import {setSignedInUser} from '../actions/signInUser'

import { Redirect } from "react-router-dom";

class SignIn extends Component {
    state = {
        signedInUser: null,
        toHome : false
    }

    handleChange = (e) => {
        const id = e.target.value;
    
        this.setState(() => ({
          signedInUser: id,
          toHome: false
        }));
       
    };

    handleSubmit =(e) => {

        const {dispatch} = this.props

        e.preventDefault();

        dispatch(setSignedInUser(this.state.signedInUser, this.state.toHome))

        this.setState(() => ({
            signedInUser: "",
            toHome: true,
          }));   
        
    }


    

    render(){

        const {users} = this.props;
        let userData = Object.values(users)

        if (this.state.toHome === true){
            <Redirect to="/home" />
        }


        return(
        
              
               <div>
                   Please Sign In
                    <div>
                        <select onChange={this.handleChange}>
                            <option value="">Select User</option>
                            {(userData || [] ).map((user)=>{
                                return(
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                )
                            })}
                        </select>
                   </div>
                   <button 
                        type='submit' 
                        disabled={!this.state.signedInUser}
                        onClick={this.handleSubmit}>Sign In </button>
               </div>
        )
    }
}


function mapStateToProps({users, signedInUser,questions}) {
    return {
      users: Object.keys(users).map((id) => {
        return { id: users[id]["id"], name: users[id]["name"] };
      }),
      signedInUser,
      questions
    };
  }

export default connect(mapStateToProps)(SignIn);