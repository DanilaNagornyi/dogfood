import './index.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';


function Search() {
    return (
        <form className="search">
            <input type="text" className='search__input' placeholder='Поиск'/>
            <button className='search__btn'>
                <SearchIcon/>
                {false && <CloseIcon/>}
            </button>
        </form>
    )
}

export default Search;
