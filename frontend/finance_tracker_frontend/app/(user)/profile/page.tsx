"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
          {
            credentials: "include", // send cookie
          }
        );

        if (res.status === 401) {
          // Not logged in
          setUser(null);
          return;
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load profile");
        }

        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        console.error("Error loading profile:", err);
        setError(err.message ?? "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <div className="p-6 lg:p-8">
        <h1 className="text-3xl font-semibold mb-4">Profile</h1>
        <p className="text-sm text-muted-foreground">
          You are not signed in. Please log in to view your profile.
        </p>
      </div>
    );
  }

  const name = user.name || "Unknown user";
  const email = user.email || "No email available";

  const initials =
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const accountCreated = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "Not available";
  const lastLogin = "Not available"; // you'll add this later if you track it

  const startEditing = () => {
    setEditName(name);
    setError(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to update profile");
      }

      const updatedUser = await res.json();

      // Update local user name
      setUser((prev) => (prev ? { ...prev, name: updatedUser.name } : prev));
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-balance">Profile</h1>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl p-8">
          {/* Profile Header Section */}
          <div className="flex flex-col items-center text-center mb-8">
            {/* Avatar-ish thing */}
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 overflow-hidden">
              <span className="flex items-center justify-center text-primary font-semibold">
                {initials || <UserIcon className="h-8 w-8" />}
              </span>
            </div>

            {/* Name and Email */}
            <h2 className="text-2xl font-semibold mb-1">{name}</h2>
            <p className="text-muted-foreground">{email}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
              Signed in
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8" />

          {/* Details Section - Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Account Created
                </p>
                <p className="text-sm font-medium">{accountCreated}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Last Login
                </p>
                <p className="text-sm font-medium">{lastLogin}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Name
                </p>
                {isEditing ? (
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  <p className="text-sm font-medium">{name}</p>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Email
                </p>
                <p className="text-sm font-medium">{email}</p>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          {/* Divider */}
          <div className="border-t border-border my-8" />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {!isEditing && (
              <>
                <Button variant="outline">Change Password</Button>
                <Button onClick={startEditing}>Edit Profile</Button>
              </>
            )}

            {isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={cancelEditing}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
