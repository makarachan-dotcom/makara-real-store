import { useState } from "react";
import { LogIn, ShoppingBag, Loader2, Shield } from "lucide-react";
import { useNavigate } from "react-router";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = getOAuthUrl();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#1c2732" }}
    >
      <div
        className="w-full max-w-sm space-y-6 animate-slide-up"
      >
        {/* Logo */}
        <div className="flex flex-col items-center space-y-3">
          <div
            className="flex items-center justify-center w-16 h-16"
            style={{
              backgroundColor: "#3390ec",
              borderRadius: "16px",
            }}
          >
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold" style={{ color: "#ffffff" }}>
              Telegram Store
            </h1>
            <p className="text-sm mt-1" style={{ color: "#6b7f94" }}>
              ចូលប្រើប្រាស់ដើម្បីបន្ត
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div
          style={{
            backgroundColor: "#2b3a4a",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="telegram-btn-primary w-full py-3 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoading ? "កំពុងបញ្ជូន..." : "ចូលប្រើប្រាស់ជាមួយ Kimi"}
            </button>

            <div
              className="text-center text-xs"
              style={{ color: "#6b7f94" }}
            >
              ឬ
            </div>

            <button
              onClick={() => navigate("/")}
              className="telegram-btn w-full py-3 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              មើលផលិតផលដោយមិនចូល
            </button>
          </div>

          <div
            className="mt-4 pt-4 text-center"
            style={{ borderTop: "1px solid #364758" }}
          >
            <p className="text-xs" style={{ color: "#4a5e73" }}>
              ការចូលប្រើប្រាស់មានសុវត្ថិភាព និងត្រូវបានការពារ
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs" style={{ color: "#4a5e73" }}>
          Telegram Store Bot · 2025
        </p>
      </div>
    </div>
  );
}
