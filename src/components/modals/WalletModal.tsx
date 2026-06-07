import { TelegramModal } from "../TelegramModal";
import { CreditCard, QrCode } from "lucide-react";
import { km } from "@/utils/khmer";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  return (
    <TelegramModal isOpen={isOpen} onClose={onClose} title={km.topupWithBakong}>
      <div className="space-y-5">
        {/* QR Code Placeholder */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-56 h-56 bg-white rounded-xl p-4 flex items-center justify-center shadow-lg">
            <QrCode className="w-44 h-44 text-[#1c2732]" strokeWidth={1} />
          </div>
          <p className="text-[#8a9bb0] text-sm text-center">{km.scanQrCode}</p>
        </div>

        {/* Info card */}
        <div className="p-4 rounded-xl bg-[#2b3a4a] space-y-2">
          <div className="flex items-center gap-2 text-white">
            <CreditCard className="w-4 h-4 text-[#3390ec]" />
            <span className="font-medium">Bakong KHQR</span>
          </div>
          <p className="text-sm text-[#8a9bb0]">
            ស្កេន QR code ខាងលើដោយប្រើប្រាស់កម្មវិធី Bakong ដើម្បីបញ្ចូលថវិការដោយស្វ័យប្រវត្តិ
          </p>
        </div>
      </div>
    </TelegramModal>
  );
}
