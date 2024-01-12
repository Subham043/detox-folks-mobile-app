import { useAuth } from "../../context/AuthProvider";
import { Redirect, Route } from "react-router";
import Login from "../../pages/Login";


const ProtectedRoute = ({component: Component, ...rest}: any) => {
    const {auth} = useAuth();
    return <Route
        {...rest}
        render={(props) =>
        auth.authenticated ? (
            <Component {...props} />
            ) : (
            <Login />
        )
        }
    />
    
}
export default ProtectedRoute