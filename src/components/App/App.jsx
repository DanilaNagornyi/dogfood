import './index.css';
import Header from "../Header/Header";
import CardList from "../CardList/CardList";
import {useEffect, useState} from "react";
import data from '../../assets/data.json';
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";


function Application() {
    const [cards, setCards] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        handleRequest();
    },[searchQuery]);

    const handleRequest = () => {
        const filterCard = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
        setCards(filterCard);
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }
    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }
    return (
        <>
            <Header>
                <Logo className='logo logo_place_header' href='/' />
                <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
            </Header>
            <main className='content container'>
             <CardList goods={cards} />
            </main>
            <Footer />
        </>
    )
}

export default Application;