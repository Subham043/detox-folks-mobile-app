import { useContext } from "react";
import { axiosPublic } from "../../axios";
import { AuthContext } from "../context/AuthProvider";

export function useAxiosPrivate(){
    const {auth} = useContext(AuthContext);
    axiosPublic.interceptors.request.use(
        config => {
            if(!config.headers['authorization'] && auth.authenticated===true){
                config.headers['authorization'] = `Bearer ${auth.token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    
    return axiosPublic;
}