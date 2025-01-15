import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import "@smastrom/react-rating/style.css";
const MealCard = ({ item }) => {
  const { title, category, photoUrl, price, review, description } = item || {};
  return (
     
    <div className="card bg-base-100 shadow-xl group overflow-hidden relative">
    {/* Image Section */}
    <figure className="relative">
      <img
        src={photoUrl}
        alt={title}
        className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <p className="absolute -mr-80 -mt-64 bg-gray-900 text-white px-4 rounded-t-lg font-bold">
        ${price}
      </p>
  
      {/* Hover Button */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-800 transition duration-300 shadow-lg">
  Details
</button>
      </div>
    </figure>

    {/* Card Body */}
    <div className="card-body">
      <div className="flex justify-between">
        <h2 className="card-title">{title}</h2>
        <Rating style={{ maxWidth: 120 }} value={review} readOnly />
      </div>
      <p>{description?.length > 50 ? `${description.slice(0, 50)}...` : description}</p>
    </div>
  </div>
  
  
  );
};

export default MealCard;
