const PremiumModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
      {/* ================= MODAL ================= */}
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* PREMIUM ICON */}
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-4xl">
          👑
        </div>

        {/* ================= TITLE ================= */}
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Premium Templates
        </h2>

        {/* ================= DESCRIPTION ================= */}
        <p className="mt-3 text-center text-gray-500">
          Unlock exclusive greeting templates, premium designs, and advanced
          personalization features.
        </p>

        {/* ================= FEATURES ================= */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-green-500">✓</span>

            <p className="text-gray-700">Unlimited premium templates</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-500">✓</span>

            <p className="text-gray-700">HD quality downloads</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-500">✓</span>

            <p className="text-gray-700">Better social sharing</p>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="mt-8 flex gap-4">
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Maybe Later
          </button>

          {/* UPGRADE */}
          <button className="flex-1 rounded-2xl bg-pink-500 py-3 font-semibold text-white transition hover:bg-pink-600">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
