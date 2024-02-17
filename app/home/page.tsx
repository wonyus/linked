"use client";
// Remember you must use an AuthProvider for
// client components to useSession
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "../components/UserCard";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function HomePage() {
  // const user = useCurrentUser();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/home");
    },
  });

  if (!session?.user) return;

  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session.user} pagetype={"Home"} />
    </section>
  );
}
