const TemplateCard = ({ template, profile, onClick }) => {
  return (
    <div
      onClick={() => onClick(template)}
      className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:scale-[1.02]"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative">
        <img
          src={template.image}
          alt="template"
          className="h-[250px] w-full object-cover sm:h-[320px]"
        />

        {/* ================= PREMIUM BADGE ================= */}
        {template.isPremium && (
          <div className="absolute right-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow">
            PREMIUM
          </div>
        )}

        {/* ================= OVERLAY ================= */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 px-3 py-2">
          <img
            src={profile?.image || "https://ui-avatars.com/api/?name=Guest"}
            alt="user"
            className="h-10 w-10 rounded-full border-2 border-green-500 object-cover shadow-lg"
          />

          <div className="overflow-hidden">
            <p className="truncate font-semibold text-white drop-shadow-lg">
              {profile?.name || "Guest User"}
            </p>

            <p className="text-sm text-slate-100 drop-shadow-md">
              Personalized Greeting ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
