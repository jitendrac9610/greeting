import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useClerk, UserButton } from "@clerk/clerk-react";

import CategoryTabs from "../components/templates/CategoryTabs";
import TemplateGrid from "../components/templates/TemplateGrid";

import PremiumModal from "../components/premium/PremiumModal";

import { getProfile, saveProfile } from "../utils/storage";

const Home = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const savedProfile = getProfile();
  const [profileState, setProfileState] = useState({
    name: savedProfile?.name || "Guest User",
    image: savedProfile?.image || "",
  });

  const displayName = profileState.name;
  const firstInitial =
    displayName.split(" ")[0]?.charAt(0).toUpperCase() || "G";

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      const updatedProfile = {
        ...profileState,
        image: imageUrl,
      };

      setProfileState(updatedProfile);
      saveProfile(updatedProfile);
    };
    reader.readAsDataURL(file);
  };

  const { signOut } = useClerk();

  const openProfileImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSignOut = async () => {
    localStorage.removeItem("guestUser");
    localStorage.removeItem("userProfile");

    try {
      await signOut();
    } catch (error) {
      console.warn("Clerk sign out failed", error);
    } finally {
      window.location.href = "/";
    }
  };

  // ================= STATES =================
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const [templates, setTemplates] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= CATEGORY =================
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ================= FETCH TEMPLATES =================
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/templates");

        const result = await response.json();

        console.log("API RESULT:", result);

        // HANDLE RESPONSE
        if (Array.isArray(result)) {
          setTemplates(result);
        } else if (result.data) {
          setTemplates(result.data);
        } else {
          setTemplates([]);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // ================= FILTER TEMPLATES =================
  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter(
          (template) =>
            template.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  // ================= TEMPLATE CLICK =================
  const handleTemplateClick = (template) => {
    // PREMIUM TEMPLATE
    if (template.isPremium) {
      setShowPremiumModal(true);

      return;
    }

    // FREE TEMPLATE
    navigate(`/preview/${template._id}`);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading Templates...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.35),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.25),_transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-slate-900 via-slate-950 to-transparent opacity-95" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-2xl backdrop-blur-xl lg:grid-cols-[1.8fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6 rounded-3xl bg-slate-900/80 p-5 shadow-lg sm:flex-row sm:items-center sm:p-6">
              <div className="relative">
                <button
                  type="button"
                  onClick={openProfileImagePicker}
                  className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-slate-800 text-center shadow-xl transition hover:scale-[1.02] focus:outline-none"
                >
                  {profileState.image ? (
                    <img
                      src={profileState.image}
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-4xl font-bold text-white">
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
                  onChange={handleProfileImageChange}
                />
              </div>

              <div className="flex-1 text-white">
                <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-200/90">
                  Welcome back
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
                  <h1 className="text-3xl font-semibold sm:text-4xl">
                    {displayName}
                  </h1>
                  <span className="inline-flex rounded-full bg-fuchsia-500/15 px-3 py-1 text-sm font-semibold text-fuchsia-200 ring-1 ring-fuchsia-500/20">
                    Hello
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Your greeting hub is ready. Use the templates below to create
                  bright, memorable messages with just a few clicks.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950/90 p-6 shadow-xl ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                Quick stats
              </p>
              <p className="mt-4 text-4xl font-semibold text-white">
                {filteredTemplates.length}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Beautiful greeting cards ready for customization.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                  <p className="font-semibold text-white">
                    Fast personalization
                  </p>
                  <p className="mt-2 text-slate-400">
                    Choose and edit instantly.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                  <p className="font-semibold text-white">Mobile friendly</p>
                  <p className="mt-2 text-slate-400">
                    Works beautifully on any screen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl bg-slate-900/90 px-5 py-5 shadow-xl ring-1 ring-white/10 sm:flex sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Explore templates
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Pick a category to find the perfect greeting style.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:flex-row sm:items-center">
            <button
              onClick={handleSignOut}
              className="rounded-full border border-fuchsia-500 bg-slate-950 px-4 py-2 text-sm font-semibold text-fuchsia-300 transition hover:bg-fuchsia-500/10"
            >
              Sign out
            </button>
            <UserButton />
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/90 p-5 shadow-xl ring-1 ring-white/10">
          <CategoryTabs
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="mt-6">
          <TemplateGrid
            templates={filteredTemplates}
            profile={profileState}
            onTemplateClick={handleTemplateClick}
          />
        </div>
      </div>

      {showPremiumModal && (
        <PremiumModal onClose={() => setShowPremiumModal(false)} />
      )}
    </div>
  );
};

export default Home;
