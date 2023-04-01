import React from 'react';
import CardList from "../../components/CardList/CardList";
import Sort from "../../components/Sort/Sort";
import ContentHeader from "../../components/layout/ContentHeader/ContentHeader";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import {skeletonFakeArray} from "./data";
import {useSelector} from "react-redux";

const CatalogPage = () => {
    const {products} = useSelector(state => state.products);
    const skeletonArray = skeletonFakeArray.map((el) => <CardSkeleton key={el}/>);

    return (
        <div className="container">
            <ContentHeader title="Каталог"/>
            <Sort/>
            {products.length === 0 ? (
                <div className='cards'>
                    {skeletonArray}
                </div>
            ) : (
                <CardList cards={products}/>
            )}
        </div>
    );
};

export default CatalogPage;
