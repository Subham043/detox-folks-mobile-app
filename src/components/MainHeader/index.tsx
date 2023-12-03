import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonImg, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import './MainHeader.css'
import { Link, useHistory } from "react-router-dom";

type Props = {
    isMainHeader: true;
} | {
    isMainHeader: false;
    name: string;
}

const MainHeader: React.FC<Props> = (props) => {
    const history = useHistory();
return <IonHeader translucent={true} className='main-header'>
    <IonToolbar className='main-header-toolbar'>
        {
            !props.isMainHeader ? <>
                <IonButtons slot="start">
                    <IonButton onClick={()=>history.goBack()}></IonButton>
                </IonButtons>
                <IonTitle>{props.name}</IonTitle>
            </> :
            <IonButtons className='main-header-logo-holder' slot='start'>
                <img src="/images/small-logo.png" className="main-header-logo" />
                <p className='main-header-logo-text'>Parcel Counter</p>
            </IonButtons>
        }
    
    <IonButtons slot="end">
        <Link to="/search">
            <IonButton className='main-header-button' color='dark'><IonIcon icon={searchOutline} /></IonButton>
        </Link>
    </IonButtons>
    </IonToolbar>
</IonHeader>
}

export default MainHeader;