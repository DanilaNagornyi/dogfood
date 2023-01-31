import './index.css';
import logoSrc from './logo.svg'

function Logo() {
  return (
    <a href='/' className='logo'>
        <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
    </a>
  )
}

export default Logo;
