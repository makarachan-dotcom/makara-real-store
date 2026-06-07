import { useNavigate } from "react-router";
import { ArrowLeft, HeadphonesIcon, MessageCircle, ArrowUpRight } from "lucide-react";
import { km } from "@/utils/khmer";

export default function Support() {
  const navigate = useNavigate();

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
            <HeadphonesIcon className="w-5 h-5 text-[#3390ec]" />
            <h1 className="text-white font-semibold text-lg">{km.technicalSupport}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Contact via Telegram */}
        <a
          href="https://t.me/support"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-[#2b3a4a] rounded-xl p-4 hover:bg-[#354554] transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-[#3390ec]/20 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-[#3390ec]" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium">Telegram</h3>
            <p className="text-[#8a9bb0] text-sm">@support</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[#8a9bb0] group-hover:text-white transition-colors" />
        </a>

        {/* Working hours */}
        <div className="bg-[#2b3a4a] rounded-xl p-4">
          <h3 className="text-white font-medium mb-3">ម៉ោងធ្វើការ</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#8a9bb0]">ថ្ងៃចន្ទ - ថ្ងៃសុក្រ</span>
              <span className="text-white">8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8a9bb0]">ថ្ងៃសៅរ៍</span>
              <span className="text-white">8:00 AM - 12:00 PM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8a9bb0]">ថ្ងៃអាទិត្យ</span>
              <span className="text-[#e74c3c]">បិទ</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[#2b3a4a] rounded-xl p-4">
          <h3 className="text-white font-medium mb-3">សំណួរញឹកញាប់</h3>
          <div className="space-y-3">
            {[
              {
                q: "តើខ្ញុំទិញផលិតផលយ៉ាងដូចម្តេច?",
                a: "ចុចប៊ូតុង Products ហើយជ្រើសរើសផលិតផលដែលអ្នកចង់ទិញ។",
              },
              {
                q: "តើខ្ញុំបង់ប្រាក់យ៉ាងដូចម្តេច?",
                a: "ប្រើប្រាស់កម្មវិធី Bakong ដើម្បីស្កេន QR code នៅក្នុង Wallet។",
              },
              {
                q: "តើការបញ្ចូលថវិការរយៈពេលប៉ុន្មាន?",
                a: "រយៈពេល 1-5 នាទីសម្រាប់ការបញ្ចូលតាម Bakong KHQR។",
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#1c2732] last:border-0 pb-3 last:pb-0">
                <p className="text-white text-sm font-medium">{faq.q}</p>
                <p className="text-[#8a9bb0] text-sm mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
