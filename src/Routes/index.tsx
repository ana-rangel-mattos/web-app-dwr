import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import Home from "../Views/Home";
import SignIn from "../Views/SignIn";
import SignUp from '../Views/SignUp';
import Settings from "../Views/Settings";
import Dashboard from "../Views/Dashboard";
import Form from "../Views/Form";
import Protected from "./Protected";
import {handleVerificationProtected, isAuthenticated} from "../Services/authentication";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route element={<Protected />}>
                <Route index element={<Home />} loader={() => handleVerificationProtected()}/>
                <Route path="dashboard" element={<Dashboard />} loader={() => handleVerificationProtected()}/>
                <Route path="settings" element={<Settings />} loader={() => handleVerificationProtected()}/>
                <Route path="new/:type" element={<Form />} loader={() => handleVerificationProtected()}/>
                <Route path=":type/:id" element={<Form />} loader={() => handleVerificationProtected()}/>
            </Route>
            <Route path="signin" element={<SignIn />} loader={() => isAuthenticated()}/>
            <Route path="signup" element={<SignUp />} loader={() => isAuthenticated()}/>
        </Route>
    )
)

function Index() {
    return (
        <RouterProvider router={router} />
    )
}

export default Index;