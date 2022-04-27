import { Navigate, Outlet } from "react-router-dom";

 const {signedInUser} = () => {
   if (this.props){
     return this.props
   }
 }



const useAuth = () => {
  const user = signedInUser;
    if(signedInUser){
      return true
    } else {
      return false
    }
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  console.log("Protected routes : " + signedInUser)
  return isAuth ? <Navigate to="/home" /> :<Navigate to="/" /> ;
};

export default ProtectedRoutes;