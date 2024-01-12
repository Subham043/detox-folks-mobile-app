import { useAuth } from "../../context/AuthProvider";
import { Route } from "react-router";
import Account from "../../pages/Account";


const GuestRoute = ({component: Component, ...rest}: any) => {
    const {auth} = useAuth();
    return <Route
        {...rest}
        render={(props) =>
        !auth.authenticated ? (
            <Component {...props} />
        ) : (
            <Account />
        )
        }
    />
    
}
export default GuestRoute