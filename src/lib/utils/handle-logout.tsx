"use client";
import React from "react";
import { useLogoutMutation } from "../apis/auth";

function HandleLogout() {
  const [mutate] = useLogoutMutation();
  return mutate();
}

export default HandleLogout;
