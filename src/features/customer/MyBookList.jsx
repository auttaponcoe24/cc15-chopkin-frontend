import React from "react";
import MyBookItem from "./MyBookItem";

export default function MyBookList({ data,myBooking }) {
	// console.log("orderStatus", data.orderStatus);

	return <>{data.orderStatus === 0 && <MyBookItem objBooking={data} myBooking={myBooking}/>}</>;
}
