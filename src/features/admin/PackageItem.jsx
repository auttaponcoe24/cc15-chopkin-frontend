import React from "react";
import { Link } from "react-router-dom";

export default function PackageItem({ obj, restaurantId, packageName }) {
	return (
		<>
			<div className="grid grid-cols-12  ">
				<div className="col-span-5 px-4 py-2 text-center border border-gray-400  ">
					{restaurantId}
				</div>
				<div className="col-span-3 px-4 py-2 text-center border border-gray-400 ">
					{packageName}
				</div>
				<Link
					to={`/admin/view-package/${obj.id}`}
					className="rounded-full col-span-2 text-center justify-items-center py-1  bg-secondary mx-4 my-2 text-white"
				>
					View
				</Link>
			</div>
		</>
	);
}
