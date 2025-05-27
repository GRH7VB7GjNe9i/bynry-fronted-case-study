import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileCard({ profile, onSummaryClick }) {
  const [showSummary, setShowSummary] = useState(false);
  const [showDetails, setDetails] = useState(false);

  const handleSummaryClick = () => {
    setShowSummary((prev) => !prev); 
  };
  const handleDetailsClick = () => {
    setDetails((prev) => !prev); 
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
      <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-full" />
      <h3 className="text-xl mt-2 font-semibold">{profile.name}</h3>
      <p className="text-sm text-gray-600">{profile.description}</p>
      <div className="flex gap-2 mt-3">
      <button
          className="px-4 py-1 bg-blue-500 text-white rounded"
          onClick={handleSummaryClick}
        >
          {showSummary ? "Hide Summary" : "Summary"}
        </button>
        <button
        onClick={() => {
          handleDetailsClick();
          onSummaryClick(profile);
        }}
        >
        <Link
          className="px-4 py-1 bg-gray-200 rounded"
        >
          {showDetails ? "Hide Details" : "Details"}
        </Link>
        </button>
        
      </div>
      {showSummary && (
        <div className="mt-4 text-sm text-gray-700 w-full">
          <hr className="my-2" />
          <h4 className="font-semibold">Summary:</h4>
          <p>{profile.summary}</p>
        </div>
      )}
      {showDetails && (
        <div className="bg-white p-6 rounded-xl shadow-md mt-4">
        <p className="text-center text-gray-600">{profile.description}</p>
        <div className="mt-4">
          <p><strong>Contact:</strong> {profile.contact}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Interests:</strong> {profile.interests.join(", ")}</p>
        </div>
        </div>

      )}
      
    </div>
  );
}
