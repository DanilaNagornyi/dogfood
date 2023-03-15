import {Route, Routes, useLocation} from "react-router-dom";
import Header from "../Header/Header";
import {useEffect, useState} from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import api from "../../utils/api";
import SearchInfo from "../SearchInfo/SearchInfo";
import useDebounce from "../../hooks/useDebounce";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import NotFoundPage from "../../pages/ NotFoundPage/NotFoundPage";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import RegistrationForm from "../../components/Forms/RegistrationForm/RegistrationForm";
import Modal from "../Modal/Modal";
import LoginForm from "../Forms/LoginForm/LoginForm";
import ResetPasswordForm from "../Forms/ResetPasswordForm/ResetPasswordForm";
import {useDispatch} from "react-redux";
import {getAllProductsThunk} from "../../redux/redux-thunk/products-thunk/getAllProductsThunk";
import {getUserInfoThunk} from "../../redux/redux-thunk/user-thunk/getUserInfoThunk";

function Application() {
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const debounceSearchQuery = useDebounce(searchQuery, 300);
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;
    const initialPath = location.state?.initialPath;

    const dispatch = useDispatch();

    useEffect(() => {
        const userData = dispatch(getUserInfoThunk());
        userData.then(() => {
            dispatch(getAllProductsThunk());
        })
    }, [dispatch]);


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

    return (
        <>
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
        </>
    )
}

export default Application;
