import { useNavigate } from "react-router";
import { Home, AlertCircle } from "lucide-react";
import { TelegramButton } from "@/components/TelegramButton";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1c2732] flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#e74c3c]/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-[#e74c3c]" />
        </div>
        <h1 className="text-white text-2xl font-bold">៤០៤</h1>
        <p className="text-[#8a9bb0] text-center">
          ទំព័រដែលអ្នកស្វែងរកមិនមានទេ
        </p>
        <TelegramButton
          variant="primary"
          icon={<Home className="w-5 h-5" />}
          onClick={() => navigate("/")}
          className="mt-2"
        >
          ទំព័រដើម
        </TelegramButton>
      </div>
    </div>
  );
}
