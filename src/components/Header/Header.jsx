// import ReactLogo from '../../../public/logo192.png'
import Logo from '../Logo/logo';
// import Search from '../Search/Search';
import './index.css';

// const AppHeader = () => {
//     return (
//         <div className="wrapper">
            {/*<img width={"200px"} src="/images/1111111.jpeg" alt="Фоновое изображение" />*/}
            {/*<img width={"200px"} src={ReactLogo} alt="Фоновое изображение" />*/}
//             <h1 className="head">Welcome React</h1>
//         </div>
//     )
// }

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header__wrapper">
                    <Logo />
                </div>
            </div>
        </header>
    )
}

export default Header;