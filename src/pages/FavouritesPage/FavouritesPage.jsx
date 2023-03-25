import React from 'react';
import Sort from "../../components/Sort/Sort";
import CardList from "../../components/CardList/CardList";
import ContentHeader from "../../components/layout/ContentHeader/ContentHeader";
import {useSelector} from "react-redux";

const FavouritesPage = () => {
    const {favourites} = useSelector(state => state.products);

    return (
        <>
            <ContentHeader title="Избранное"/>
            <Sort/>
            <CardList cards={favourites}/>
        </>
    );
};

export default FavouritesPage;
