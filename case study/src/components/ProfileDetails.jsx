import React from "react";
import { profiles } from "../data/profiles";

export default function ProfileDetails({ id }) {
  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    return <p className="text-red-500">Profile not found.</p>;
  }

  return (
    <div>
      
    </div>
  );
}
