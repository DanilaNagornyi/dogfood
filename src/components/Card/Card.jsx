import './index.css';
import save from "./save.svg";
import cn from "classnames";

const Card = ({ name, price, discount, wight, description, picture, tags }) => {
    const discountPrice = Math.round(price - price * discount / 100);
  return (
      <div className='card'>
        <div className='card__sticky card__sticky_type_top-left'>
            {discount !== 0 && <span className='card__discount'>{`-${discount}%`}</span>}
            {tags && tags.map(tag => <span key={tag} className={cn('tag', {
                // [`tag_type_${tag}`]: true
                ['tag_type_new']: tag === 'new',
                ['tag_type_sale']: tag === 'sale',
            })}>{tag}</span>) }
        </div>
          <div className='card__sticky card__sticky_type_top-right'>
              <button className='card__favorite'>
                  <img src={save} alt="Добавить в избранное" className='card__favorite-icon'/>
              </button>
          </div>
          <a href="#" className='card__link'>
              <img src={picture} className='card__image' alt={description}/>
              <div className='card__desc'>
                  <span className={discount !== 0  ? 'card__old-price' : 'card__price'}>{price}&nbsp;₽</span>
                  {discount !== 0 && <span className='card__price card__price_type_discount'>{discountPrice}&nbsp;₽</span>}
                  <span className='card__wight'>{wight}</span>
                  <p className='card__name'>{name}</p>
              </div>
          </a>
          <a href="#" className='card__cart btn btn_type_primary'>В корзину</a>
      </div>
  );
};

export default Card;
