import { useSessionStore } from "@/app/stores/session.store";
import { Navigate } from "react-router";

export default function Welcome() {
    const { email, isAuthenticated } = useSessionStore();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className='h-screen w-full p-4 flex justify-center items-center gap-2 text-blue-900'>
            <h2>Welcome, {email}</h2>
        </div>
    );
}
