import { useAuth } from "../../context/AuthProvider";
import { Redirect, Route } from "react-router";


const GuestRoute = ({component: Component, ...rest}: any) => {
    const {auth} = useAuth();
    return <Route
        {...rest}
        render={(props) =>
        !auth.authenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to="/account" />
        )
        }
    />
    
}
export default GuestRoute