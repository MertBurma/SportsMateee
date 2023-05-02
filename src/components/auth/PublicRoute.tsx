import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RouteProps, Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store";

const PublicRoute: FC<RouteProps> = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return !authenticated ? <Outlet /> : <Navigate to="/upcoming-events" />;
};

export default PublicRoute;
