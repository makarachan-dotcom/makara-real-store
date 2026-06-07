import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ShoppingCart,
  Wallet,
  User,
  Users,
  HeadphonesIcon,
  Globe,
  ShieldCheck,
  Github,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { TelegramButton, TelegramButtonGrid } from "@/components/TelegramButton";
import { GithubModal } from "@/components/modals/GithubModal";
import { GeminiModal } from "@/components/modals/GeminiModal";
import { WalletModal } from "@/components/modals/WalletModal";
import { useAuth } from "@/hooks/useAuth";
import { km } from "@/utils/khmer";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [githubOpen, setGithubOpen] = useState(false);
  const [geminiOpen, setGeminiOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1c2732] animate-fade-in">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-3">
        {/* Header with user info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-[#3390ec]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#2b3a4a] flex items-center justify-center">
                <User className="w-5 h-5 text-[#8a9bb0]" />
              </div>
            )}
            <div>
              <p className="text-white font-medium text-sm">
                {user?.name || km.welcome}
              </p>
              <p className="text-[#8a9bb0] text-xs">
                {user ? "អ្នកប្រើប្រាស់" : "មិនបានចូល"}
              </p>
            </div>
          </div>
          {user && (
            <button
              onClick={logout}
              className="text-xs text-[#8a9bb0] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-[#2b3a4a]"
            >
              {km.logout}
            </button>
          )}
        </div>

        {/* Full-width buttons: Activate GitHub */}
        <TelegramButton
          variant="full"
          icon={<Github className="w-6 h-6" />}
          iconAnimation="bounce"
          onClick={() => setGithubOpen(true)}
        >
          {km.activateGithub}
        </TelegramButton>

        {/* Full-width buttons: Activate Gemini */}
        <TelegramButton
          variant="full"
          icon={<Sparkles className="w-6 h-6" />}
          iconAnimation="pulse"
          onClick={() => setGeminiOpen(true)}
        >
          {km.activateGemini}
        </TelegramButton>

        {/* 2-column grid: Products (primary) + Wallet */}
        <TelegramButtonGrid>
          <TelegramButton
            variant="primary"
            icon={<ShoppingCart className="w-5 h-5" />}
            iconAnimation="bounce"
            onClick={() => navigate("/products")}
          >
            {km.products}
          </TelegramButton>
          <TelegramButton
            variant="default"
            icon={<Wallet className="w-5 h-5" />}
            iconAnimation="pulse"
            onClick={() => setWalletOpen(true)}
          >
            {km.wallet}
          </TelegramButton>
        </TelegramButtonGrid>

        {/* 2-column grid: Profile + Referrals */}
        <TelegramButtonGrid>
          <TelegramButton
            variant="default"
            icon={<User className="w-5 h-5" />}
            onClick={() => navigate("/profile")}
          >
            {km.profile}
          </TelegramButton>
          <TelegramButton
            variant="default"
            icon={<Users className="w-5 h-5" />}
            onClick={() => navigate("/referrals")}
          >
            {km.referrals}
          </TelegramButton>
        </TelegramButtonGrid>

        {/* 2-column grid: Technical Support + Language */}
        <TelegramButtonGrid>
          <TelegramButton
            variant="default"
            icon={<HeadphonesIcon className="w-5 h-5" />}
            iconAnimation="wobble"
            onClick={() => navigate("/support")}
          >
            <span className="flex items-center gap-1">
              {km.technicalSupport}
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8a9bb0]" />
            </span>
          </TelegramButton>
          <TelegramButton
            variant="default"
            icon={<Globe className="w-5 h-5" />}
            iconAnimation="spin"
            onClick={() => {}}
          >
            {km.languageToggle}
          </TelegramButton>
        </TelegramButtonGrid>

        {/* 2-column grid: Terms of Use (single centered) */}
        <TelegramButtonGrid>
          <TelegramButton
            variant="default"
            icon={<ShieldCheck className="w-5 h-5" />}
            onClick={() => navigate("/terms")}
          >
            {km.termsOfUse}
          </TelegramButton>
          <div /> {/* Empty spacer for grid balance */}
        </TelegramButtonGrid>
      </div>

      {/* Modals */}
      <GithubModal isOpen={githubOpen} onClose={() => setGithubOpen(false)} />
      <GeminiModal isOpen={geminiOpen} onClose={() => setGeminiOpen(false)} />
      <WalletModal isOpen={walletOpen} onClose={() => setWalletOpen(false)} />
    </div>
  );
}
