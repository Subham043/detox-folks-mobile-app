import { IonApp, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonPage, IonContent } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, fileTrayStackedOutline, cartOutline, personCircleOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import './PageTabs.css';
import Home from "../../pages/Home";
import Category from "../../pages/Category";
import SubCategory from "../../pages/SubCategory";
import Product from "../../pages/Product";
import Search from "../../pages/Search";
import ProductDetail from "../../pages/ProductDetail";
import Cart from "../../pages/Cart";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import Setting from "../../pages/Setting";
import Account from "../../pages/Account";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import GuestRoute from "../GuestRoute";
import ProtectedRoute from "../ProtectedRoute";
import SpecialProduct from "../../pages/SpecialProduct";
import { CartContext } from "../../context/CartProvider";
import BillingAddress from "../../pages/BillingAddress";
import BillingInformation from "../../pages/BillingInformation";
import Orders from "../../pages/Orders";
import OrderDetail from "../../pages/OrderDetail";
import { Network } from '@capacitor/network';
import NoNetwork from "../NoNetwork";
import Contact from "../../pages/Contact";
import Cart2 from "../../pages/Cart/Cart2";
import Product2 from "../../pages/Product/Product2";
import ProductDetail2 from "../../pages/ProductDetail/ProductDetail2";

const PageTabs: React.FC = () => {

  const {auth} = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [hasNetwork, setHasNetwork] = useState<boolean>(true);

  
  useEffect(()=>{
    let isMounted = true;
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
      setHasNetwork(status.connected);
    };
    if(isMounted){
      Network.addListener('networkStatusChange', async (status) => await logCurrentNetworkStatus());
      logCurrentNetworkStatus()
    }

    return () => {
      Network.removeAllListeners()
      isMounted=false;
    }
  }, [])

  if(!hasNetwork) {
    return <NoNetwork />
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/category" component={Category}></Route>
            <Route exact path="/sub-category" component={SubCategory}></Route>
            <Route exact path="/product" component={Product}></Route>
            <Route exact path="/main-product" component={Product2}></Route>
            <Route exact path="/product-detail/:slug" component={ProductDetail2}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route exact path="/cart" component={Cart2}></Route>
            <Route exact path="/special-product/:slug" component={SpecialProduct}></Route>
            <ProtectedRoute exact path="/setting" component={Setting}></ProtectedRoute>
            <ProtectedRoute exact path="/contact" component={Contact}></ProtectedRoute>
            <ProtectedRoute exact path="/account" component={Account}></ProtectedRoute>
            <ProtectedRoute exact path="/billing-address" component={BillingAddress}></ProtectedRoute>
            <ProtectedRoute exact path="/billing-information" component={BillingInformation}></ProtectedRoute>
            <ProtectedRoute exact path="/orders" component={Orders}></ProtectedRoute>
            <ProtectedRoute exact path="/order/:slug" component={OrderDetail}></ProtectedRoute>
            <GuestRoute exact path="/login" component={Login}></GuestRoute>
            <GuestRoute exact path="/register" component={Register}></GuestRoute>
            <GuestRoute exact path="/forgot-password" component={ForgotPassword}></GuestRoute>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton className='main-tabs' tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab="products" href="/main-product">
              <IonIcon icon={fileTrayStackedOutline} />
              <IonLabel>Products</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab="cart" href="/cart">
              <>
                <IonIcon icon={cartOutline} />
                <IonBadge color="dark">{cart.cart.length}</IonBadge>
              </>
              <IonLabel>Cart</IonLabel>
            </IonTabButton>

            <IonTabButton className='main-tabs' tab={auth.authenticated ? "account" : "login"} href={auth.authenticated ? "/account" : "/login"}>
              <IonIcon icon={personCircleOutline} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default PageTabs;