import { useParams } from "react-router-dom";
import NewBookingList from "../features/restaurant/NewBookingList";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../config/axios";

export default function ResApproveBookingPage() {
	const { resId } = useParams();
	const [getBookingByResId, setGetBookingByResId] = useState([]);

	useEffect(() => {
		const fetchBookingByResId = async () => {
			try {
				const res = await axios.get(`/booking/restaurant/${resId}`);
				console.log(
					"fatchBookgingByResId =>",
					res.data.allRestaurantBookingData
				);
				setGetBookingByResId(res.data.allRestaurantBookingData);
			} catch (err) {
				console.log(err);
			}
		};
		fetchBookingByResId();
	}, []);

	const changeBookingStatusApprove = async (bookingId) => {
		try {
			const editBookingApprove = getBookingByResId.filter(
				(e) => e.id !== bookingId
			);
			if (editBookingApprove.status === 1) {
				return setGetBookingByResId(editBookingApprove);
			}
			await axios.patch(`booking/updateStatus/`, {
				status: 1,
				bookingId,
			});
			setGetBookingByResId(editBookingApprove);
		} catch (err) {
			console.log(err);
		}
	};

	const changeBookingStatusReject = async (bookingId) => {
		try {
			const editBookingReject = getBookingByResId.filter(
				(e) => e.id !== bookingId
			);
			if (editBookingReject.status === 2) {
				return setGetBookingByResId(editBookingReject);
			}
			await axios.patch(`booking/updateStatus/`, {
				status: 2,
				bookingId,
			});
			setGetBookingByResId(editBookingReject);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="min-h-screen">
			<div className="text-4xl font-medium p-6 pl-64 pb-10">
				Approve Booking
			</div>
			<div className="flex flex-col justify-evenly items-center ">
				{getBookingByResId.map((item, index) => (
					<div key={index}>
						<NewBookingList
							data={item}
							index={index}
							changeBookingStatusApprove={changeBookingStatusApprove}
							changeBookingStatusReject={changeBookingStatusReject}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
