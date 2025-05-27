import React from "react";
import { useState, useRef, useEffect } from "react";
import { profiles as initialProfiles } from "./data/profiles";
import ProfileCard from "./components/ProfileCard";
import SearchBar from "./components/SearchBar";
import ProfileDetails from "./components/ProfileDetails";
import AdminDashBoard from "./components/AdminDashBoard";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function AnimatedMapView({ lat, lng, name }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 1.5 });
  }, [lat, lng, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          {name}'s Location
        </Popup>
      </Marker>
    </>
  );
}

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminView, setAdminView] = useState(false);

  const filteredProfiles = initialProfiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">User Profiles</h1>
        <button
          onClick={() => setAdminView(!adminView)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {adminView ? "View Users" : "Admin Dashboard"}
        </button>
      </div>

      {adminView ? (
        <AdminDashBoard />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="grid md:grid-cols-3 gap-4">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSummaryClick={setSelectedProfile}
              />
            ))}
          </div>
          {selectedProfile && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Map for {selectedProfile.name}</h2>
              <div className="h-64 w-full rounded-lg mt-4">
                <MapContainer
                  center={[selectedProfile.lat, selectedProfile.lng]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full rounded-lg"
                >
                  <AnimatedMapView
                    lat={selectedProfile.lat}
                    lng={selectedProfile.lng}
                    name={selectedProfile.name}
                  />
                </MapContainer>
              </div>
              <ProfileDetails id={selectedProfile.id} />
            </div>
          )}
        </>
      )}
    </div>
  );
}