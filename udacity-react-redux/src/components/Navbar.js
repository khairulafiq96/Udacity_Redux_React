import react, {Component} from "react";
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import { signOutUser } from "../actions/signInUser";
import { signInUser } from "../actions/users";

class Navbar extends Component {

    handleLogOut = (e) => {
        e.preventDefault();
        const {dispatch} = this.props

        dispatch(signOutUser());

        this.setState(()=>({
            signedInUser:null
        }))
    }

    displaySignedInUser(user){
        if (user) {
            const name = this.props.users[user].name
            return ' || Hello ' + name
        }
    }




    render() {
        const { signedInUser } = this.props;
        return (
            <div>
                    <NavLink exact to='/'>Home || </NavLink>
                    <NavLink exact to='/add'>New Question || </NavLink>
                    <NavLink exact to='/leaderboard'>Leaderboard || </NavLink>
                    <button onClick={this.handleLogOut}>
                        Sign Out
                    </button>
                    
                    {this.displaySignedInUser(signedInUser)}
                    

              
            </div>
        )
    }
}

function mapStateToProps({signedInUser, users}){
    return {
        signedInUser,
        users
    }
}

export default connect(mapStateToProps)(Navbar);