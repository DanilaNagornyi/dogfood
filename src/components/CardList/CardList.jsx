import './index.css';
import Card from "../Card/Card";
import NotFound from "../../components/NotFound/NotFound";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


const CardList = ({cards}) => {
    const {isLoading} = useSelector(state => state.products);

    const navigate = useNavigate();

    return (
        <>
            {!cards.length && !isLoading ? (
                <NotFound title="Простите, по вашему запросу товаров не надено." buttonText="Назад"
                          buttonAction={() => navigate(0)}/>
            ) : null}

            <div className='cards'>
                {cards.map(el => {
                    return (
                        <Card key={el._id} {...el} />
                    )
                })}
            </div>
        </>
    );
};

export default CardList;
