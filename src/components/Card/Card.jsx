import './index.css';
import {ReactComponent as Save} from "./save.svg";
import cn from "classnames";
import {calcDiscountPrice, isLiked} from "../../utils/products";
import {Link} from "react-router-dom";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {changeLikeProductThunk} from "../../redux/redux-thunk/products-thunk/changeLikeProductThunk";

const Card = ({name, price, discount, wight, description, pictures, tags, likes, _id}) => {
    const {userInfo, isLoading} = useSelector(state => state.user);
    const discountPrice = calcDiscountPrice(price, discount);
    const liked = isLiked(likes, userInfo?._id);
    const dispatch = useDispatch();

    const handleLikeClick = useCallback(() => {
        return dispatch(changeLikeProductThunk({_id, likes}));
    }, [_id, dispatch, likes])

    return (
        <>
            {isLoading ? (
                <CardSkeleton/>
            ) : (
                <div className='card'>
                    <div className='card__sticky card__sticky_type_top-left'>
                        {discount !== 0 && <span className='card__discount'>{`-${discount}%`}</span>}
                        {tags && tags.map(tag => <span key={tag} className={cn('tag', {
                            // [`tag_type_${tag}`]: true
                            ['tag_type_new']: tag === 'new',
                            ['tag_type_sale']: tag === 'sale',
                        })}>{tag}</span>)}
                    </div>
                    <div className='card__sticky card__sticky_type_top-right'>
                        <button className={cn('card__favorite', {
                            'card__favorite_is-active': liked
                        })} onClick={handleLikeClick}>
                            <Save className='card__favorite-icon'/>
                        </button>
                    </div>
                    <Link to={`/product/${_id}`} className='card__link'>
                        <img src={pictures} className='card__image' alt={description}/>
                        <div className='card__desc'>
                            <span className={discount !== 0 ? 'card__old-price' : 'card__price'}>{price}&nbsp;₽</span>
                            {discount !== 0 &&
                                <span className='card__price card__price_type_discount'>{discountPrice}&nbsp;₽</span>}
                            <span className='card__wight'>{wight}</span>
                            <p className='card__name'>{name}</p>
                        </div>
                    </Link>
                    <a href="#" className='card__cart btn btn_type_primary'>В корзину</a>
                </div>
            )}

        </>
    );
};

export default Card;
