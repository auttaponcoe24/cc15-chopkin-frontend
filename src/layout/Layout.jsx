import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import LiveChat from "./LiveChat";

export default function Layout() {
	return (
		<>
			<Header />
			<LiveChat/>
			<Outlet />
			<Footer />
		</>
	);
}
