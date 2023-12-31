import React from "react";
import RestaurantList from "../../features/restaurant/RestaurantList";
import useRes from "../../Hooks/use-res";

export default function ListRestaurantPage() {
  const { restaurantAll } = useRes();
  // console.log("reaAll=>", restaurantAll);

  return (
    <div className="flex flex-col gap-2 p-4 max-w-[1200px] mx-auto">
      <h1>Restaurant List</h1>
      <small className="mb-4">Hi, Welcome back to Admin!</small>

      <div className="grid grid-cols-4 items-center justify-items-center gap-10">
        {restaurantAll?.map((item, index) => (
          <div key={index}>
            <RestaurantList data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
