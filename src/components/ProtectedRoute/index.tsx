import { useAuth } from "../../context/AuthProvider";
import { Redirect, Route, RouteProps } from "react-router";


const ProtectedRoute = ({component: Component, ...rest}: RouteProps) => {
    const {auth} = useAuth();
    const { path, exact } = {...rest};
    return auth.authenticated ? <Route exact={exact} path={path} component={Component}></Route> : 
    <Route exact={exact} path={path}>
        <Redirect to="/login" />
    </Route>;
    
}
export default ProtectedRoute