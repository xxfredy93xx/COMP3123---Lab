
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserById } from "../services/userService";

import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function UserDetails({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getUserById(userId);
                setUser(data);
            } catch (err) {
                setError("Failed to fetch user details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!user) {
        return <ErrorMessage message="User not found." />;
    }

    return (
        <div className="mx-auto max-w-3xl">

            <Link
                href="/users"
                className="mb-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
                ← Back to Users
            </Link>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-600 p-8 text-white">

                    <div className="flex items-center gap-5">

                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold">
                            {user.name.charAt(0)}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold">
                                {user.name}
                            </h1>

                            <p className="text-blue-100">
                                @{user.username}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Profile Information */}
                <div className="grid gap-6 p-8 sm:grid-cols-2">

                    <section>
                        <h3 className="mb-3 font-bold text-gray-900">
                            Contact Information
                        </h3>

                        <p className="mb-2 text-sm text-gray-600">
                            Email: {user.email}
                        </p>

                        <p className="mb-2 text-sm text-gray-600">
                            Phone: {user.phone}
                        </p>

                        <p className="text-sm text-gray-600">
                            Website: {user.website}
                        </p>
                    </section>

                    <section>
                        <h3 className="mb-3 font-bold text-gray-900">
                            Address
                        </h3>

                        <p className="text-sm text-gray-600">
                            {user.address.street}, {user.address.suite}
                        </p>

                        <p className="text-sm text-gray-600">
                            {user.address.city}, {user.address.zipcode}
                        </p>

                        <p className="mt-2 text-xs text-gray-500">
                            Coordinates: {user.address.geo.lat},{" "}
                            {user.address.geo.lng}
                        </p>
                    </section>

                    <section className="sm:col-span-2">
                        <h3 className="mb-3 font-bold text-gray-900">
                            Company Information
                        </h3>

                        <p className="font-semibold text-blue-700">
                            {user.company.name}
                        </p>

                        <p className="text-sm text-gray-600">
                            {user.company.catchPhrase}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Business: {user.company.bs}
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
