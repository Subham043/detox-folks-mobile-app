import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Redirect, Route } from "react-router";


const ProtectedRoute = ({component: Component, ...rest}: any) => {
    const {auth} = useContext(AuthContext);
    return <Route
        {...rest}
        render={(props) =>
        auth.authenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
        }
    />
    
}
export default ProtectedRoute