import React, {Component,Fragment } from 'react'
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import QuestionAdd from './QuestionAdd'
import Leaderboard from './Leaderboard';
import NotFound from './NotFound';


import { handleInitialData } from '../actions/common';
import { connect } from 'react-redux'



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ShowQuestion from './ShowQuestion';

class App extends Component{



  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }


  render(){

    const {signedInUser} = this.props

    return(
      <Router>
      <Fragment>
      <div className='App'>
        {!signedInUser ? (  <div>
                              <Switch>
                                <Route component={SignIn} />
                              </Switch>
                            </div>
                         )
                       : (
                          <div>
                               <Navbar signedInUser={signedInUser} />
                                <Switch>
                                  <Route exact path="/" component={Dashboard} signedInUser={signedInUser}/>
                                  <Route path="/add" component={QuestionAdd} />
                                  <Route path="/questions/:id" component={ShowQuestion} />
                                  <Route path="/leaderboard" component={Leaderboard} />
                                  <Route path="/NotFound" component={NotFound} />
                                </Switch>
                          </div>
                          )}
      </div>
      </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({users,signedInUser}){
  return {
    users,
    signedInUser
  }
}

export default connect(mapStateToProps)(App);
