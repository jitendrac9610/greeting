import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  const handleGuestLogin = () => {
    localStorage.setItem(
      "guestUser",
      JSON.stringify({
        isGuest: true,
      }),
    );

    window.location.href = "/profile-setup";
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.35),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.25),_transparent_40%)]" />
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-slate-900 via-slate-950 to-transparent opacity-95" />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-200/90">
            Welcome
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Greetings App
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Create personalized greeting wishes and share joy with loved ones
          </p>
        </div>

        <SignIn afterSignInUrl="/profile-setup" />

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-slate-700"></div>

          <span className="text-sm text-slate-500 uppercase tracking-[0.12em]">
            Or
          </span>

          <div className="h-[1px] flex-1 bg-slate-700"></div>
        </div>

        {/* Guest Login */}
        <button
          onClick={handleGuestLogin}
          className="w-full rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:opacity-95"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Login;
