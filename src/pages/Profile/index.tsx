import {
    IonPage,
    IonContent,
    IonCard,
    IonButton,
    IonList,
    IonSpinner,
    IonCardContent,
} from "@ionic/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useContext, useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader";
import { AuthContext } from "../../context/AuthProvider";
import { useToast } from "../../hooks/useToast";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { api_routes } from "../../helper/routes";
import Input from "../../components/Input";
import CommonHeading from "../../components/CommonHeading";

const fields = [
    {
      placeholder: "Enter name",
      label: "Name",
      type: "text",
      name: "name",
      inputmode: "text",
    },
    {
      placeholder: "Enter email",
      label: "Email",
      type: "email",
      name: "email",
      inputmode: "email",
    },
    {
        placeholder: "Enter phone",
        label: "Phone",
        type: "text",
        name: "phone",
        inputmode: "numeric",
    },
];

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
  })
  .required();

const Profile: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const {auth} = useContext(AuthContext);
    const {toastSuccess, toastError} = useToast();
    const axiosPrivate = useAxiosPrivate();

    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        reset,
        setError,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

      useEffect(() => {
        setValue('name', auth.user ? auth.user.name : '')
        setValue('email', auth.user ? auth.user.email : '')
        setValue('phone', auth.user ? auth.user.phone : '')
      
        return () => {}
      }, [auth.authenticated])
      

      const onSubmit = async () => {
        setLoading(true);
        try {
          const response = await axiosPrivate.post(api_routes.profile_update, getValues());
          toastSuccess('Profile updated seccessfully.');
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.name) {
            setError("name", {
              type: "server",
              message: error?.response?.data?.errors?.name[0],
            });
          }
          if (error?.response?.data?.errors?.email) {
            setError("email", {
              type: "server",
              message: error?.response?.data?.errors?.email[0],
            });
          }
          if (error?.response?.data?.errors?.phone) {
            setError("phone", {
              type: "server",
              message: error?.response?.data?.errors?.phone[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <IonPage>
            <MainHeader isMainHeader={false} name="Profile" link="/account" />
            <IonContent fullscreen={false} forceOverscroll={true}>
                <CommonHeading text="Profile" />
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <IonList className="ion-no-padding">
                            {fields.map((item, i) => (
                                <Input
                                    {...item}
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
                                        "Update"
                                    )}
                                </IonButton>
                            </div>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
