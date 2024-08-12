import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating({ stars, isDefaultChecked }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const STAR_SIZE = 30;

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            className="hidden"
                            // defaultChecked={rating === ratingValue}
                            defaultChecked={true}
                            onClick={() => {
                                if (isDefaultChecked) {
                                    return;
                                }
                                setRating(ratingValue);
                            }}
                        />
                        {isDefaultChecked ? (
                            <FaStar
                                size={STAR_SIZE}
                                className={` ${
                                    ratingValue <= stars
                                        ? 'text-yellow-500'
                                        : 'text-gray-300'
                                }`}
                            />
                        ) : (
                            <FaStar
                                size={STAR_SIZE}
                                className={`cursor-pointer transition-colors duration-200 ${
                                    ratingValue <= (hover || rating)
                                        ? 'text-yellow-500'
                                        : 'text-gray-300'
                                }`}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                            />
                        )}
                    </label>
                );
            })}
        </div>
    );
}
