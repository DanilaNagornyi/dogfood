import './index.css';
import Header from "../Header/Header";
import CardList from "../CardList/CardList";
import {useEffect, useState} from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import api from "../../utils/api";
import SearchInfo from "../SearchInfo/SearchInfo";
import useDebounce from "../../hooks/useDebounce";
import card from "../Card/Card";


function Application() {
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debounceSearchQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getProductList()])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData.products);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        handleRequest();
        console.log('INPUT', debounceSearchQuery)
    },[debounceSearchQuery]);

    const handleRequest = () => {
        // const filterCard = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
        api.search(debounceSearchQuery).then(data => {
            setCards(data);
        }).catch(err => console.error(err));
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }
    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handleUpdateUser = (userUpdate) => {
        api.setUserInfo(userUpdate).then((newUserData) => {
            setCurrentUser(newUserData);
        })
    }

    const handleProductLike = (product) => {
        const isLiked = product.likes.some(id => id === currentUser.id); //ищем в массиве лайков id текущего пользователя.
        api.changeLikeProduct(product._id, isLiked).then((newCard) => { // в зависимости от того есть ли лайки или нет отправляем запрос "DELETE" или "PUT"
            const newCards = cards.map((card) => {
                // console.log('Карточка в переборе', card);
                // console.log('Карточка с сервера', newCard);
                return card._id === newCard._id ? newCard : card;
             })
            setCards(newCards);
        })
    }

    return (
        <>
            <Header user={currentUser} updateUserHandle={handleUpdateUser}>
                <Logo className='logo logo_place_header' href='/' />
                <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
            </Header>
            <main className='content container'>
                <SearchInfo searchCount={cards.length} searchText={searchQuery} />
                 <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
            </main>
            <Footer />
        </>
    )
}

export default Application;