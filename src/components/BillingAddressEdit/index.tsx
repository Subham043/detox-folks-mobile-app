import { useEffect, useState } from 'react';
import './BillingAddressEdit.css';
import * as yup from "yup";
import { useToast } from '../../hooks/useToast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IonButton, IonCard, IonCardContent, IonItem, IonList, IonSpinner, IonTextarea } from '@ionic/react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { api_routes } from '../../helper/routes';
import Input from '../Input';
import { ErrorMessage } from '@hookform/error-message';
import { KeyedMutator } from 'swr';
import { BillingAddressType } from '../../helper/types';

type Props = ({
    isEdit: true;
    data: BillingAddressType;
} | {
    isEdit: false;
}) & {
    showModal: React.Dispatch<React.SetStateAction<boolean>>
    mutate: KeyedMutator<BillingAddressType[]>
}

const fields = [
    {
        placeholder:"Enter your country",
        label:"Country",
        type:"text",
        name:"country",
        inputmode:"text"
    },{
        placeholder:"Enter your state",
        label:"State",
        type:"text",
        name:"state",
        inputmode:"text",
    },{
        placeholder:"Enter your city",
        label:"City",
        type:"text",
        name:"city",
        inputmode:"text"
    },{
        placeholder:"Enter your pin",
        label:"Pin",
        type:"text",
        name:"pin",
        inputmode:"numeric"
    }
]

const schema = yup
  .object({
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    pin: yup
        .string()
        .required(),
  })
  .required();

const BillingAddressEdit:React.FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const {toastSuccess, toastError} = useToast();

    const {
        handleSubmit,
        setValue,
        register,
        getValues,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(()=>{
        if(props.isEdit){
            setValue('country', props.data.country);
            setValue('state', props.data.state);
            setValue('city', props.data.city);
            setValue('pin', props.data.pin.toString());
            setValue('address', props.data.address);
        }

    }, [props.isEdit])

    const onSubmit = async () => {
        setLoading(true);
        try {
          await axiosPrivate.post(!props.isEdit ? api_routes.billing_address_create : api_routes.billing_address_update+`/${props.isEdit===true ? props.data.id : ''}`, {...getValues(), is_active:true});
          toastSuccess("Billing Address created successfully.");
          reset({
            country: "",
            state: "",
            city: "",
            address: "",
            pin: "",
          });
          props.mutate()
          props.showModal(false);
        } catch (error: any) {
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.country) {
            setError("country", {
              type: "server",
              message: error?.response?.data?.errors?.country[0],
            });
          }
          if (error?.response?.data?.errors?.state) {
            setError("state", {
              type: "server",
              message: error?.response?.data?.errors?.state[0],
            });
          }
          if (error?.response?.data?.errors?.city) {
            setError("city", {
              type: "server",
              message: error?.response?.data?.errors?.city[0],
            });
          }
          if (error?.response?.data?.errors?.address) {
            setError("address", {
              type: "server",
              message: error?.response?.data?.errors?.address[0],
            });
          }
          if (error?.response?.data?.errors?.pin) {
            setError("pin", {
              type: "server",
              message: error?.response?.data?.errors?.pin[0],
            });
          }
        } finally {
          setLoading(false);
        }
    };

    return <IonCard className='address-create-card mt-2 mb-2'>
        <IonCardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    fields.map((item, i) => <IonList className="ion-no-padding" key={i}>
                        <Input
                            {...item}
                            register={register}
                            errors={errors}
                        />
                    </IonList>)
                }
                <IonList className="ion-no-padding">
                    <>
                        <IonItem className="ion-no-padding">
                            <IonTextarea
                                className="ion-no-padding main-input"
                                labelPlacement="floating"
                                placeholder='Enter your address'
                                label='Address'
                                inputmode="text"
                                {...register('address')}
                            >
                            </IonTextarea>
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name='address'
                            as={<div style={{ color: 'red' }} />}
                        />
                    </>
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
                            "Save"
                        )}
                    </IonButton>
                </div>
            </form>
        </IonCardContent>
    </IonCard>
}

export default BillingAddressEdit;