"use client";

import Login from "@/components/login.js";
import { useUser } from "@/hooks/index.js";
import Cartable from "./(pages)/dashboard/cartable/page.js";

function index() {
  return useUser() ? <Cartable /> : <Login />;
}

export default index;
