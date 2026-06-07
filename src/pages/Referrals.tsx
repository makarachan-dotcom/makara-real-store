import { useNavigate } from "react-router";
import { ArrowLeft, Users, Copy, Check, UserPlus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { km } from "@/utils/khmer";

export default function Referrals() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.unionId
    ? `REF-${user.unionId.slice(0, 8).toUpperCase()}`
    : "REF-XXXXXXXX";

  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c2732] animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#1c2732]/95 backdrop-blur-sm border-b border-[#2b3a4a]">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#2b3a4a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#3390ec]" />
            <h1 className="text-white font-semibold text-lg">{km.referrals}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#2b3a4a] rounded-xl p-4 text-center">
            <p className="text-[#8a9bb0] text-xs mb-1">ការបញ្ចូនសរុប</p>
            <p className="text-white text-2xl font-bold">0</p>
          </div>
          <div className="bg-[#2b3a4a] rounded-xl p-4 text-center">
            <p className="text-[#8a9bb0] text-xs mb-1">ចំណូល</p>
            <p className="text-[#2ecc71] text-2xl font-bold">$0.00</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-[#2b3a4a] rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#3390ec]" />
            <h3 className="text-white font-medium">តំណការបញ្ចូន</h3>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-[#1c2732] rounded-lg px-3 py-2.5 text-sm text-[#8a9bb0] truncate">
              {referralLink}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-[#3390ec] text-white rounded-lg hover:bg-[#2a7fd6] transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="text-sm">{copied ? "បានចម្លង" : "ចម្លង"}</span>
            </button>
          </div>

          <p className="text-[#8a9bb0] text-xs">
            ចែករំលែកតំណនេះជាមួយមិត្ភភក្តិរបស់អ្នក។ អ្នកនឹងទទួលបានកម្រៃជើងសារនៅពេលមិត្ភភក្តិរបស់អ្នកទិញផលិតផល។
          </p>
        </div>

        {/* Referral Code */}
        <div className="mt-4 bg-[#2b3a4a] rounded-xl p-4 text-center">
          <p className="text-[#8a9bb0] text-xs mb-2">លេខកូដការបញ្ចូន</p>
          <p className="text-white text-xl font-mono font-bold tracking-wider">
            {referralCode}
          </p>
        </div>
      </div>
    </div>
  );
}
