import { useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { saveProfile } from "../utils/storage";

const ProfileSetup = () => {
  const { user } = useUser();
  const fileInputRef = useRef(null);

  const guestUser = localStorage.getItem("guestUser");
  const defaultName = user?.fullName || "Guest User";
  const [name, setName] = useState(defaultName);
  const [image, setImage] = useState(user?.imageUrl || "");

  const firstInitial = defaultName.charAt(0).toUpperCase();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    saveProfile({
      name,
      image,
      isGuest: !!guestUser,
    });

    window.location.href = "/home";
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.35),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.25),_transparent_40%)]" />
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-slate-900 via-slate-950 to-transparent opacity-95" />

      <div className="relative z-10 w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-200/90">
            Final step
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Build your profile
          </h1>
          <p className="mt-3 px-6 text-sm text-slate-400 sm:px-20">
            Add a profile picture and display name so your greeting cards feel
            more personal and unique.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <button
              type="button"
              onClick={openImagePicker}
              className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-slate-800 text-5xl font-bold text-slate-400 shadow-xl transition hover:scale-[1.02]"
            >
              {image ? (
                <img
                  src={image}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-5xl font-bold text-white">
                  {firstInitial}
                </div>
              )}
              <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-500 text-lg font-bold text-white shadow-md">
                +
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="w-full space-y-4 px-4 sm:px-0">
            <label className="block text-sm font-medium uppercase tracking-[0.12em] text-slate-300">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-3xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 outline-none transition placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20"
            />

            <button
              onClick={handleContinue}
              className="w-full rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:opacity-95"
            >
              Continue to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
