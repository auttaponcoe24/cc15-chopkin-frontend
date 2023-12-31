import React from "react";
import RestaurantItem from "./RestaurantItem";

export default function RestaurantList({ data, recommended = false }) {
  return (
    <div className="border border-gray-200  w-[15rem] rounded-lg cursor-pointer hover:shadow-lg hover:transition">
      {data.status === 1 && (
        <RestaurantItem
          objRes={data}
          name={data.restaurantName}
          profileImg={data.profileImg}
          price={data.price}
          catIndex={data.categoryIndex}
          reviews={data.Reviews}
          avgScore={data.avgScore}
          recommended={recommended}
        />
      )}
    </div>
  );
}
