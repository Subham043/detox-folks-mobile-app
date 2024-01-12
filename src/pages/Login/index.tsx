import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonImg, IonList, IonPage, IonRow, IonSpinner, IonText } from '@ionic/react';
import './Login.css';
import MainHeader from '../../components/MainHeader';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../components/Input';
import { axiosPublic } from '../../../axios';
import { api_routes } from '../../helper/routes';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../context/AuthProvider';
import { useSWRConfig } from 'swr';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();  

const fields = [
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "email",
      inputmode: "email",
    },
    {
      placeholder: "Enter password",
      label: "Password",
      type: "password",
      name: "password",
      inputmode: "text",
    },
];

const Login: React.FC = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const {setAuth} = useAuth();
    const {toastSuccess, toastError} = useToast();
    const { mutate } = useSWRConfig()

    const {
        handleSubmit,
        register,
        getValues,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.login, getValues());
          toastSuccess('Logged in seccessfully.');
          reset({
            email: "",
            password: "",
          });
          setAuth({auth:{
            authenticated: true,
            token: response.data.token,
            token_type: response.data.token_type,
            user: response.data.user
          }})
          mutate(api_routes.cart_all)
        } catch (error: any) {
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.email) {
            setError("email", {
              type: "server",
              message: error?.response?.data?.errors?.email[0],
            });
          }
          if (error?.response?.data?.errors?.password) {
            setError("password", {
              type: "server",
              message: error?.response?.data?.errors?.password[0],
            });
          }
        } finally {
          setLoading(false);
        }
    };

    return <IonPage>
        <MainHeader isMainHeader={true} />
        <IonContent
        fullscreen={false}
        forceOverscroll={false}
        >
            <div className='auth-container'>
                <IonCard className='w-100 auth-card'>
                    <IonCardHeader>
                        <IonText color="dark" className="text-center">
                            <h3>LOGIN</h3>
                        </IonText>
                    </IonCardHeader>

                    <IonCardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <IonList className="ion-no-padding auth-input-item">
                            {fields.map((item, i) => (
                                <Input
                                    {...item}
                                    isAuth={true}
                                    register={register}
                                    errors={errors}
                                    key={i}
                                />
                            ))}
                            </IonList>
                            <div className='text-center'>
                                <IonButton
                                    color="dark"
                                    type="submit"
                                    size='small'
                                    className="mt-1 login-button"
                                >
                                    {loading ? (
                                        <IonSpinner name="crescent"></IonSpinner>
                                    ) : (
                                        "Login"
                                    )}
                                </IonButton>
                            </div>
                        </form>
                        <IonGrid className="mt-1">
                            <IonRow className="ion-align-items-center ion-justify-content-between">
                            <IonCol size="6">
                                <Link className="no-underline login-link-text" to="/register">
                                    <IonText color="dark">
                                        <p className="login-link-text text-left">
                                            <b>Register</b>
                                        </p>
                                    </IonText>
                                </Link>
                            </IonCol>
                            <IonCol size="6">
                                <Link className="no-underline login-link-text" to="/forgot-password">
                                    <IonText color="dark">
                                        <p className="login-link-text text-right">
                                            <b>Forgot Password?</b>
                                        </p>
                                    </IonText>
                                </Link>
                            </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </div>
        </IonContent>
    </IonPage>
}
export default Login