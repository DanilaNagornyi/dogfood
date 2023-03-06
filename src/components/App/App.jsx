import {Route, Routes, useLocation} from "react-router-dom";
import Header from "../Header/Header";
import {useCallback, useEffect, useState} from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import api from "../../utils/api";
import SearchInfo from "../SearchInfo/SearchInfo";
import useDebounce from "../../hooks/useDebounce";
import {isLiked} from "../../utils/products";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import NotFoundPage from "../../pages/ NotFoundPage/NotFoundPage";
import {UserContext} from "../../context/userContext";
import {CardContext} from "../../context/cardContext";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import RegistrationForm from "../../components/Forms/RegistrationForm/RegistrationForm";
import Modal from "../Modal/Modal";
import LoginForm from "../Forms/LoginForm/LoginForm";
import ResetPasswordForm from "../Forms/ResetPasswordForm/ResetPasswordForm";

function Application() {
    const [cards, setCards] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const debounceSearchQuery = useDebounce(searchQuery, 300);
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;
    const initialPath = location.state?.initialPath;
    const addContact = (contactInfo) => {
        setContacts([...contacts, contactInfo]);
    }

    useEffect(() => {
        setIsLoading(true);
        Promise.all([api.getUserInfo(), api.getProductList()])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData.products);
                const favouritesProducts = cardData.products.filter(item => isLiked(item.likes, userData._id));
                setFavourites(favouritesProducts);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        handleRequest();
        console.log('INPUT', debounceSearchQuery)
    }, [debounceSearchQuery]);

    const handleRequest = () => {
        setIsLoading(true);
        api.search(debounceSearchQuery).then(data => {
            setCards(data);
        }).catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
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

    const handleProductLike = useCallback((product) => {
        const liked = isLiked(product.likes, currentUser._id); //ищем в массиве лайков id текущего пользователя.
        return api.changeLikeProduct(product._id, liked).then((newCard) => { // в зависимости от того есть ли лайки или нет отправляем запрос "DELETE" или "PUT"
            const newCards = cards.map((card) => {
                return card._id === newCard._id ? newCard : card;
            })

            if (!liked) {
                setFavourites(prevState => [...prevState, newCard])

            } else {
                setFavourites(prevState => prevState.filter(card => card._id !== newCards._id));
            }

            setCards(newCards);
            return newCard
        })
    }, [cards, currentUser])

    return (
        <UserContext.Provider value={{
            user: currentUser,
            isLoading
        }}> {/* Внедряем данные из стейта currentUser  с помощью провайдера контекста*/}
            <CardContext.Provider value={{cards, favourites, handleLike: handleProductLike, isLoading}}>
                <Header user={currentUser}
                        updateUserHandle={handleUpdateUser}> {/*Всем дочерним элементам доступен контекст*/}
                    <Logo className='logo logo_place_header' href='/'/>
                    <Routes>
                        <Route path="/" element={
                            <Search onInput={handleInputChange} onSubmit={handleFormSubmit}/>
                        }/>
                    </Routes>

                </Header>
                <main className='content container'>
                    <SearchInfo searchCount={cards.length} searchText={searchQuery}/>
                    <Routes
                        location={(backgroundLocation && {...backgroundLocation, pathname: initialPath}) || location}>
                        <Route index element={<CatalogPage/>}/>
                        <Route path="/product/:productId" element={<ProductPage/>}/>
                        <Route path="/favourites" element={<FavouritesPage/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/registration" element={<RegistrationForm/>}/>
                        <Route path="/reset-password" element={<ResetPasswordForm/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>

                    {backgroundLocation && (
                        <Routes>
                            <Route path="/login" element={
                                <Modal>
                                    <LoginForm linkState={{backgroundLocation: location, initialPath}}/>
                                </Modal>
                            }/>
                            <Route path="/registration" element={
                                <Modal>
                                    <RegistrationForm linkState={{backgroundLocation: location, initialPath}}/>
                                </Modal>
                            }/>
                            <Route path="/reset-password" element={
                                <Modal>
                                    <ResetPasswordForm linkState={{backgroundLocation: location, initialPath}}/>
                                </Modal>
                            }/>
                        </Routes>
                    )}
                </main>
                <Footer/>
            </CardContext.Provider>
        </UserContext.Provider>
    )
}

export default Application;
