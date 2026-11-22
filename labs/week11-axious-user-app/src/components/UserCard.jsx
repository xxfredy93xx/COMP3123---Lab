
import Link from "next/link";

export default function UserCard({ user }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow">

            <div className="mb-4 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                    {user.name.charAt(0)}
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900">
                        {user.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        @{user.username}
                    </p>
                </div>

            </div>

            <div className="space-y-2 text-sm text-gray-600">
                <p>📧 {user.email}</p>
                <p>📍 {user.address.city}</p>
                <p>🏢 {user.company.name}</p>
            </div>

            <Link
                href={`/users/${user.id}`}
                className="mt-5 inline-flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
                View Details →
            </Link>

        </div>
    );
}
