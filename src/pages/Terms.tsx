import { useNavigate } from "react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { km } from "@/utils/khmer";

export default function Terms() {
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
            <ShieldCheck className="w-5 h-5 text-[#3390ec]" />
            <h1 className="text-white font-semibold text-lg">{km.termsOfUse}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-[#2b3a4a] rounded-xl p-5 space-y-4">
          <section>
            <h3 className="text-white font-medium mb-2">១. លក្ខខណ្ឌទូទៅ</h3>
            <p className="text-[#8a9bb0] text-sm leading-relaxed">
              ដោយការប្រើប្រាស់សេវាកម្មរបស់យើង អ្នកបានយល់ព្រមតាមលក្ខខណ្ឌប្រើប្រាស់ទាំងអស់ដែលមាននៅទីនេះ។
              ប្រសិនបើអ្នកមិនយល់ព្រម សូមកុំប្រើប្រាស់សេវាកម្មរបស់យើង។
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-2">២. ផលិតផលនិងសេវាកម្ម</h3>
            <p className="text-[#8a9bb0] text-sm leading-relaxed">
              យើងផ្តល់ជូនផលិតផលឌីជីថលជាច្រើនប្រភេទ។ ផលិតផលទាំងអស់គឺជាផលិតផលឌីជីថល
              ហើយនឹងត្រូវបានផ្ញើជាលេខកូដតាមរយៈកម្មវិធី Telegram។
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-2">៣. ការទូទាត់ប្រាក់</h3>
            <p className="text-[#8a9bb0] text-sm leading-relaxed">
              ការទូទាត់ប្រាក់ត្រូវបានធ្វើតាមរយៈប្រព័ន្ធ Bakong KHQR។
              ការទិញទាំងអស់គឺជាចុងក្រោយ ហើយមិនអាចត្រឡប់ប្រាក់បានទេ។
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-2">៤. ការទទួលខុសត្រូវ</h3>
            <p className="text-[#8a9bb0] text-sm leading-relaxed">
              យើងមិនទទួលខុសត្រូវចំពោះការខូចខាតណាមួយដែលបណ្តាលមកពីការប្រើប្រាស់ផលិតផលរបស់យើងខុសត្រូវ។
              អ្នកប្រើប្រាស់ត្រូវតែទទួលខុសត្រូវលើការប្រើប្រាស់ផលិតផលរបស់ខ្លួនឯង។
            </p>
          </section>

          <section>
            <h3 className="text-white font-medium mb-2">៥. ការផ្លាស់ប្តូរលក្ខខណ្ឌ</h3>
            <p className="text-[#8a9bb0] text-sm leading-relaxed">
              យើងអាចធ្វើការផ្លាស់ប្តូរលក្ខខណ្ឌប្រើប្រាស់នេះនៅពេលណាមួយ។
              ការផ្លាស់ប្តូរនឹងមានប្រសិទ្ធភាពភ្លាមៗបន្ទាប់ពីបានបង្ហាញនៅលើទំព័រនេះ។
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
