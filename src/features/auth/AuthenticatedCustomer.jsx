import React from "react";
import useAuth from "../../Hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function AuthenticatedCustomer({ children }) {
	const { authUser } = useAuth();
	const authCustomer = authUser?.firstName;

	if (!authCustomer) {
		return <Navigate to="/login" />;
	}
	return children;
}
