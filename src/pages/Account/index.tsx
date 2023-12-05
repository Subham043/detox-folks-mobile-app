import {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonIcon,
    IonSpinner,
} from "@ionic/react";
import { bagCheckOutline, cogOutline, locationOutline, logOutOutline, peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useToast } from "../../hooks/useToast";
import { api_routes } from "../../helper/routes";
import { AuthContext } from "../../context/AuthProvider";
import MainHeader from "../../components/MainHeader";


const Account: React.FC = () => {

    const {logout} = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const {toastSuccess, toastError} = useToast();
    const axiosPrivate = useAxiosPrivate();
    const history = useHistory();

    const logoutHandler = async() => {
        setLoading(true);
        try {
          await axiosPrivate.post(api_routes.logout, {});
          logout();
          toastSuccess('Logged out successfully.');
          history.push('/login');
        } catch (error: any) {
            toastError('Something went wrong. Please try again later!');
        }finally {
            setLoading(false);
        }
    }
    return (
        <IonPage>
            <MainHeader isMainHeader={true} />
            <IonContent fullscreen={false} forceOverscroll={false}>
                <Link className="no-underline" to="/profile">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Profile</IonLabel>
                        <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/setting">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Setting</IonLabel>
                        <IonIcon icon={cogOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/billing-information">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Billing Information</IonLabel>
                        <IonIcon icon={peopleCircleOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/billing-address">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Billing Address</IonLabel>
                        <IonIcon icon={locationOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                <Link className="no-underline" to="/orders">
                    <IonItem lines="full" detail={true}>
                        <IonLabel>Orders</IonLabel>
                        <IonIcon icon={bagCheckOutline} slot="start"></IonIcon>
                    </IonItem>
                </Link>
                {loading ? (
                    <IonItem lines="full" detail={true}>
                        <IonSpinner name="crescent" color='dark'></IonSpinner>
                    </IonItem>
                ) : (
                    <IonItem lines="full" detail={true} onClick={logoutHandler}>
                        <IonLabel>Logout</IonLabel>
                        <IonIcon icon={logOutOutline} slot="start"></IonIcon>
                    </IonItem>
                )}

            </IonContent>
        </IonPage>
    );
};

export default Account;
