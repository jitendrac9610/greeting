import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import html2canvas from "html2canvas";

import { getProfile } from "../utils/storage";

const Preview = () => {
  const { id } = useParams();

  const profile = getProfile();

  const previewRef = useRef(null);

  // ================= STATES =================
  const [template, setTemplate] = useState(null);

  const [loading, setLoading] = useState(true);

  // ================= FETCH TEMPLATE =================
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/templates/${id}`,
        );

        const result = await response.json();

        setTemplate(result.data);
      } catch (error) {
        console.log("Template Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  // ================= DOWNLOAD IMAGE =================
  const handleDownload = async () => {
    const canvas = await html2canvas(previewRef.current);

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;

    link.download = "greeting-card.png";

    link.click();
  };

  // ================= SHARE IMAGE =================
  const handleShare = async () => {
    const canvas = await html2canvas(previewRef.current);

    canvas.toBlob(async (blob) => {
      const file = new File([blob], "greeting-card.png", {
        type: "image/png",
      });

      // Native Share API
      if (navigator.share) {
        await navigator.share({
          title: "Greeting Card",
          text: "Check out my personalized greeting!",
          files: [file],
        });
      } else {
        alert("Sharing not supported on this browser");
      }
    });
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading Preview...
      </div>
    );
  }

  // ================= TEMPLATE NOT FOUND =================
  if (!template) {
    return (
      <div className="p-10 text-center text-2xl font-bold">
        Template Not Found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.25),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.2),_transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-8 flex items-center justify-between rounded-3xl bg-slate-900/90 px-6 py-5 shadow-xl ring-1 ring-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Greeting Preview
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Customize and share your personalized greeting
            </p>
          </div>
        </div>

        {/* ================= PREVIEW AREA ================= */}
        <div
          ref={previewRef}
          className="mx-auto mb-8 max-w-2xl overflow-hidden rounded-3xl bg-slate-900/90 shadow-2xl ring-1 ring-white/10"
        >
          <div className="relative">
            {/* TEMPLATE IMAGE */}
            <img
              src={template.image}
              alt="template"
              className="h-[600px] w-full object-cover"
            />

            {/* PERSONALIZED OVERLAY */}
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 px-6 py-4">
              <img
                src={profile?.image || "https://ui-avatars.com/api/?name=Guest"}
                alt="user"
                className="h-16 w-16 rounded-full border-4 border-green-500 object-cover shadow-lg"
              />

              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  {profile?.name || "Guest User"}
                </h2>

                <p className="text-slate-100 drop-shadow-md">
                  Wishing You Happiness ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row">
          {/* SHARE */}
          <button
            onClick={handleShare}
            className="flex-1 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:opacity-95"
          >
            Share
          </button>

          {/* DOWNLOAD */}
          <button
            onClick={handleDownload}
            className="flex-1 rounded-full border-2 border-fuchsia-500 bg-slate-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-fuchsia-300 transition hover:bg-fuchsia-500/10"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
