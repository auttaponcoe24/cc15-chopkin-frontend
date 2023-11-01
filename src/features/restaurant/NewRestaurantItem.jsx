import React from "react";
import MyButton from "../../components/MyButton";
import { BsPersonCircle, BsTelephone } from "react-icons/bs";
import { FaPizzaSlice } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

export default function NewRestaurantItem({
	ownerName,
	resName,
	email,
	phone,
	located,
	type,
	nation,
	status,
}) {
	const handleClickApprove = () => {};
	return (
		<div className="flex flex-col gap-2 mb-4">
			<div className="grid grid-cols-12 gap-14 ">
				<div className="col-span-2 flex items-center justify-end text-red-500">
					<BsPersonCircle size={20} />
				</div>
				<div className="col-span-5 text-red-500 font-semibold">
					Owner Name
				</div>
				<div className="col-span-5">{ownerName}</div>
			</div>
			<div className="grid grid-cols-12 gap-14 ">
				<div className="col-span-2 flex items-center justify-end text-red-500">
					<FaPizzaSlice size={20} />
				</div>
				<div className="col-span-5 text-red-500 font-semibold">
					Restaurant Name
				</div>
				<div className="col-span-5">{resName}</div>
			</div>
			<div className="grid grid-cols-12 gap-14 ">
				<div className="col-span-2 flex items-center justify-end text-red-500">
					<AiOutlineMail size={20} />
				</div>
				<div className="col-span-5 text-red-500 font-semibold">
					Email
				</div>
				<div className="col-span-5">{email}</div>
			</div>
			<div className="grid grid-cols-12 gap-14 ">
				<div className="col-span-2 flex items-center justify-end text-red-500">
					<BsTelephone size={20} />
				</div>
				<div className="col-span-5 text-red-500 font-semibold">
					Phone
				</div>
				<div className="col-span-5">{phone}</div>
			</div>
			<div className="grid grid-cols-12 gap-14 ">
				<div className="col-span-2 flex items-center justify-end text-red-500">
					<CiLocationOn size={20} />
				</div>
				<div className="col-span-5 text-red-500 font-semibold">
					Restaurant Located
				</div>
				<div className="col-span-5">{located}</div>
			</div>
			<div className="grid grid-cols-12 gap-14 ">
				<div className="col-span-2 flex items-center justify-end text-red-500">
					<FaPizzaSlice size={20} />
				</div>
				<div className="col-span-5 text-red-500 font-semibold">
					Restaurant Type
				</div>
				<div className="col-span-5">{type}</div>
			</div>
			<div className="grid grid-cols-12 gap-14 ">
				<div className="col-span-2 flex items-center justify-end text-red-500">
					<FaPizzaSlice size={20} />
				</div>
				<div className="col-span-5 text-red-500 font-semibold">
					Cuisine Nationality
				</div>
				<div className="col-span-5">{nation}</div>
			</div>

			<div className="flex items-center justify-center gap-4 my-4">
				{status ? (
					<>
						{/* <MyButton
							style={`bg-red-500 hover:bg-red-400 px-8 rounded-full`}
						>
							RemoveDataBase
						</MyButton> */}
						<h1 className="border-b border-red-500 text-green-500 font-semibold">
							OK APPROVE
						</h1>
					</>
				) : (
					<>
						<MyButton
							style={`bg-green-500 hover:bg-green-400 px-6 rounded-full`}
						>
							Approve
						</MyButton>
						<MyButton
							style={`bg-red-500 hover:bg-red-400 px-8 rounded-full`}
						>
							Reject
						</MyButton>
					</>
				)}
			</div>
			<hr />
		</div>
	);
}
