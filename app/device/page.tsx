import { redirect } from "next/navigation";

import { useCurresntUser } from "@/lib/auth";

import UserCard from "../components/UserCard";
import Devices from "./devices";

export default async function DevicePage() {
  const user = await useCurresntUser();

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/device");
  }
  // console.log(user);

  return (
    <>
      <Devices />
      {/* <UserCard user={user} pagetype={"Device"} /> */}
    </>
  );
}
