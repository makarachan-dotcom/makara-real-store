import { LogIn, User, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { km } from "@/utils/khmer";

function getOAuthUrl() {
  const authUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${authUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1c2732] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#3390ec] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c2732] flex flex-col items-center justify-center px-6 animate-fade-in">
      {/* Logo area */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="w-20 h-20 rounded-2xl bg-[#3390ec] flex items-center justify-center shadow-lg shadow-[#3390ec]/20">
          <Lock className="w-10 h-10 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold">{km.login}</h1>
          <p className="text-[#8a9bb0] text-sm mt-1">
            ចូលប្រើប្រាស់ដើម្បីបន្ត
          </p>
        </div>
      </div>

      {/* Login button */}
      <a
        href={getOAuthUrl()}
        className="w-full max-w-sm flex items-center justify-center gap-3 bg-[#3390ec] hover:bg-[#2a7fd6] text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-150 active:scale-[0.97]"
      >
        <User className="w-5 h-5" />
        <span>{km.login} ជាមួយ Kimi</span>
        <LogIn className="w-5 h-5" />
      </a>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="mt-4 text-[#8a9bb0] hover:text-white text-sm transition-colors"
      >
        ត្រឡប់ទៅទំព័រដើម
      </button>
    </div>
  );
}
