import React from "react";
import blank from "../../assets/blank.png";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { categoryIndex } from "../../data/dataRes";

export default function RestaurantItem({
	objRes,
	name,
	profileImg,
	price,
	catIndex,
}) {
	const category = categoryIndex.filter((item) => item.id === +catIndex);
	return (
		<>
			<Link to={`/restaurant/${objRes.id}`}>
				<div className="w-full h-[200px]">
					<img
						src={profileImg || blank}
						alt={name}
						className="w-full h-full object-fill rounded-t-3xl"
					/>
				</div>
				<div className="p-4">
					<div className="font-semibold text-lg">{name}</div>
					<div className="font-light text-md ">
						{category[0].title}
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-1">
							<div>
								<AiFillStar
									size={30}
									className="text-yellow-400"
								/>
							</div>
							<div className="text-primary font-semibold">
								3.0
							</div>
						</div>
						<div className="text-primary font-semibold">
							{price}
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}
