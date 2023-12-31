import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsBorderWidth, BsFillChatDotsFill } from "react-icons/bs";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { BsPerson, BsFillPencilFill } from "react-icons/bs";
import { TfiBookmarkAlt } from "react-icons/tfi";
import { TbPackages } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa";
import MenuList from "../features/admin/MenuList";

const menuAdmin = [
	{
		id: 1,
		to: "/admin",
		text: "Dashboard",
		icon: <AiOutlineHome />,
	},
	{
		id: 2,
		to: "/admin/list-restaurant",
		text: "Restaurant List",
		icon: <BsBorderWidth />,
	},
	{
		id: 3,
		to: "/admin/new-restaurant",
		text: "New Restaurant",
		icon: <HiOutlineArchiveBox />,
	},
	{
		id: 4,
		to: "/admin/customer",
		text: "Customer",
		icon: <BsPerson />,
	},
	{
		id: 5,
		to: "/admin/booking",
		text: "Booking",
		icon: <TfiBookmarkAlt />,
	},
	{
		id: 6,
		to: "/admin/edit",
		text: "Editing Request",
		icon: <BsFillPencilFill />,
	},
	{
		id: 7,
		to: "/admin/package",
		text: "Package Request",
		icon: <TbPackages />,
	},
	{
		id: 8,
		to: "/admin/image",
		text: "Images Request",
		icon: <FaRegImages />,
	},
	{
		id: 9,
		to: "/admin/chat",
		text: "Chat Request",
		icon: <BsFillChatDotsFill />,
	},
];

export default function AsideAdmin() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 px-4 py-4 ">
			{menuAdmin.map((item, index) => (
				<div key={index} className="w-full px-2 py-2">
					<MenuList data={item} />
				</div>
			))}
		</div>
	);
}
