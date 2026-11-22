import UserList from "@/components/UserList";

export default function UsersPage() {
    return (
        <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    User Management
                </h1>

                <p className="mt-2 text-gray-500">
                    Browse users and view their profile information.
                </p>
            </header>

            <UserList />
        </main>
    );
}
