import { IonCol, IonGrid, IonRow } from '@ionic/react';
import './SpecialProductSection.css';
import CommonHeading from '../../components/CommonHeading';
import ProductCard from '../../components/ProductCard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useCallback, useState } from 'react';
import { MetaType, ProductType } from '../../helper/types';
import { api_routes } from '../../helper/routes';
import useSWRInfinite from "swr/infinite";
import LoadingCard from '../../components/LoadingCard';
import LoadMoreButton from '../../components/LoadMoreButton';
import ShowMoreButton from '../ShowMoreButton';

const PAGE_SIZE = 20;

type Props = {
    inHomePage?: boolean;
    slug?: "is_featured" | "is_new" | "is_on_sale";
    name?: string;
}

const SpecialProductSection: React.FC<Props> = ({inHomePage=true, slug, name}) => {
    const axiosPrivate = useAxiosPrivate();
    const [meta, setMeta] = useState<MetaType|undefined>(undefined)
    const fetcher = useCallback((url: string) => axiosPrivate.get(url).then((res) => {
        setMeta(res.data.meta)
        console.log(res.data);
        
        return res.data.data
    }), [slug]);
    const getKey = useCallback((pageIndex:any, previousPageData:any) => {
        if (previousPageData && previousPageData.length===0) return null;
        return `${api_routes.products}?total=${PAGE_SIZE}&page=${pageIndex+1}&sort=id${slug ? `&filter[${slug}]=true` : ''}`;
    }, [slug])
    
    const {
        data,
        size,
        setSize,
        isLoading
    } = useSWRInfinite<ProductType>(getKey, fetcher,{
        initialSize:1,
        revalidateAll: false,
        revalidateFirstPage: false,
        persistSize: false,
        parallel: false
    });

    console.log(meta);
    
    return (
        <>
            <CommonHeading text={name ? name : ''} />
            <IonGrid>
                <IonRow className="ion-align-items-center ion-justify-content-between">
                    {
                        (data ? data.flat(): []).map((item, i) => <IonCol
                            size="6"
                            size-xl="3"
                            size-lg="3"
                            size-md="4"
                            size-sm="6"
                            size-xs="6"
                            key={i}
                        >
                            <ProductCard image={item.image} link={`/product-detail/${item.id}`} text={item.name} />
                        </IonCol>)
                    }
                </IonRow>
            </IonGrid>
            {
                (isLoading) && <LoadingCard itemCount={6} column={6} />
            }
            {
                inHomePage ? <ShowMoreButton link={`/special-product/${slug}`} /> : 
                (meta && meta.current_page!==meta.last_page) && <LoadMoreButton clickHandler={()=>setSize(size+1)} />
            }
        </>
    );
};

export default SpecialProductSection;
