// app/users/profile/page.tsx
'use client';

import { fetchUserProfile, UserProfile } from '@/lib/users/profile';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);
            setError(null);

            const result = await fetchUserProfile();

            if (result.success && result.data) {
                setProfile(result.data);
            } else {
                setError(result.error || 'Failed to load profile');
            }

            setLoading(false);
        };

        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-gray-600">No profile data available</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-8">
                    <h1 className="text-3xl font-bold text-white">User Profile</h1>
                    <p className="text-blue-100 mt-1">View your account information</p>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                            <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                            <p className="text-lg font-semibold text-gray-900">{profile.email}</p>
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                            <div className="inline-flex items-center">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${profile.role === 'librarian'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {profile.role}
                                </span>
                            </div>
                        </div>

                        {/* Created At */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Account Created</label>
                            <p className="text-gray-900">
                                {new Date(profile.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}