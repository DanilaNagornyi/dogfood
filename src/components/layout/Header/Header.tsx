import s from './Header.module.css';
import cn from 'classnames';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ReactComponent as FavouriteIcon} from './img/favorites.svg';
import {ReactComponent as UserIcon} from './img/profile.svg';
import {ReactComponent as Logout} from './img/logout.svg';
import {logout} from "../../../redux/redux-slice/user/userSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";

const Header = ({children}): JSX.Element => {
    const {favourites} = useAppSelector(state => state.products);
    const {isAuth} = useAppSelector(state => state.user);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate(0);
    }

    return (
        <header className={cn(s.header, 'cover')}>
            <div className="container">
                <div className={s.wrapper}>
                    {children}
                    <div className={s.iconsMenu}>
                        <Link className={s.favouritesLink} to='/favourites'>
                            <FavouriteIcon/>
                            {favourites.length !== 0 && <span className={s.iconBubble}>{favourites.length}</span>}
                        </Link>

                        {isAuth ? (
                            <>
                                <div>
                                    <Link to="profile"><UserIcon/></Link>
                                </div>
                                <div onClick={handleLogout}>
                                    <Logout/>
                                </div>
                            </>
                        ) : (
                            <Link to="/login" state={{
                                backgroundLocation: location,
                                initialPath: location.pathname
                            }}
                                  style={{textDecoration: 'none'}}>
                                <div className={s.wrapperEntry}>
                                    Войти
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
