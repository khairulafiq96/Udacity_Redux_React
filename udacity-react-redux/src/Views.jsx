import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./components/Dashboard";


const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route element={<ProtectedRoutes/>}>
        <Route path="/home" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Views;