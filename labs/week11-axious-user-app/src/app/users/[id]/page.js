
import { Suspense } from "react";
import UserDetails from "@/components/UserDetails";

export default function UserDetailsPage({ params }) {
    return (
        <Suspense fallback={<p>Loading user details...</p>}>
            <UserDetailsContent params={params} />
        </Suspense>
    );
}

async function UserDetailsContent({ params }) {
    const { id } = await params;

    const userId = Number(id);

    if (!Number.isInteger(userId) || userId < 1 || userId > 10) {
        return (
            <main className="mx-auto max-w-3xl px-6 py-10">
                <h1 className="text-2xl font-bold text-red-600">
                    Invalid User ID
                </h1>

                <p className="mt-2 text-gray-600">
                    Please provide a valid user ID between 1 and 10.
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
            <UserDetails userId={userId} />
        </main>
    );
}
