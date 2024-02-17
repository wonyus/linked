import UserCard from "../components/UserCard";
import { redirect } from "next/navigation";
import Devices from "./devices";
import { useCurresntUser } from "@/lib/auth";

export default async function DevicePage() {
  const user = await useCurresntUser();

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/device");
  }
  // console.log(user);

  return (
    <>
      <Devices />
      <UserCard user={user} pagetype={"Device"} />
    </>
  );
}
