import s from './Header.module.css';
import cn from 'classnames';
import {Link} from "react-router-dom";
import { ReactComponent as FavouriteIcon } from './img/favorites.svg';
import {useContext} from "react";
import {CardContext} from "../../context/cardContext";
const Header = ({ children}) => {
    const { favourites } = useContext(CardContext);
    return (
        <header className={cn(s.header, 'cover')}>
            <div className="container">
                <div className={s.wrapper}>
                    {children}
                    <div className={s.iconsMenu}>
                        <Link className={s.favouritesLink} to='/favourites'>
                            <FavouriteIcon />
                            {favourites.length !== 0 && <span className={s.iconBubble}>{favourites.length}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
