import { useCurresntUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChangePassword from "./changePassword";

export default async function SettingPage() {
    const user = await useCurresntUser();

    if (!user) {
        redirect("/api/auth/signin?callbackUrl=/setting");
    }
    return (
        <div>
        <h1>Settings</h1>
            <ChangePassword />
        </div>
    );
}