import React, {useCallback, useEffect, useState} from 'react';
import {ReactComponent as StarIcon} from "./img/star.svg";
import cn from "classnames";
import s from './Rating.module.scss';

const Rating = ({isEditable = false, rating, setRating}) => {
    const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));

    const constructRating = useCallback((currentRating) => {
        const updateRating = ratingArray.map((el, index) => {
            return (
                <StarIcon
                    className={cn(s.star, {
                        [s.filled]: index < currentRating,
                        [s.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(index + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => changeRating(index + 1)}
                />
            )
        })
        setRatingArray(updateRating);
    }, [rating, isEditable]);

    const changeDisplay = (rating) => {
        if (!isEditable) return;
        constructRating(rating);
    }

    const changeRating = (rating) => {
        if (!isEditable || !setRating) return;

        setRating(rating);
    }

    useEffect(() => {
        constructRating(rating);

    }, [rating, constructRating])

    return (
        <div>
            {ratingArray.map((star, index) => <span key={index}>{star}</span>)}
        </div>
    );
};

export default Rating;
