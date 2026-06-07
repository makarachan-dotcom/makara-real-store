import { useNavigate } from "react-router";
import { ArrowLeft, User, Mail, Calendar, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { km } from "@/utils/khmer";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
            <User className="w-5 h-5 text-[#3390ec]" />
            <h1 className="text-white font-semibold text-lg">{km.profile}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-[#2b3a4a] rounded-xl p-6 flex flex-col items-center gap-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt=""
              className="w-24 h-24 rounded-full object-cover border-4 border-[#3390ec]"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#1c2732] flex items-center justify-center border-4 border-[#3390ec]">
              <User className="w-10 h-10 text-[#8a9bb0]" />
            </div>
          )}

          <div className="text-center">
            <h2 className="text-white font-semibold text-xl">
              {user?.name || "អ្នកប្រើប្រាស់"}
            </h2>
            <p className="text-[#8a9bb0] text-sm mt-1">
              {user?.email || "មិនមានអ៊ីមែល"}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3390ec]/20">
            <Shield className="w-4 h-4 text-[#3390ec]" />
            <span className="text-[#3390ec] text-sm font-medium">
              {user?.role === "admin" ? "អ្នកគ្រប់គ្រង" : "អ្នកប្រើប្រាស់"}
            </span>
          </div>
        </div>

        {/* Info Details */}
        <div className="mt-4 space-y-2">
          <div className="bg-[#2b3a4a] rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1c2732] flex items-center justify-center">
              <User className="w-5 h-5 text-[#8a9bb0]" />
            </div>
            <div>
              <p className="text-[#8a9bb0] text-xs">ឈ្មោះ</p>
              <p className="text-white text-sm">{user?.name || "N/A"}</p>
            </div>
          </div>

          <div className="bg-[#2b3a4a] rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1c2732] flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#8a9bb0]" />
            </div>
            <div>
              <p className="text-[#8a9bb0] text-xs">អ៊ីមែល</p>
              <p className="text-white text-sm">{user?.email || "N/A"}</p>
            </div>
          </div>

          <div className="bg-[#2b3a4a] rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1c2732] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#8a9bb0]" />
            </div>
            <div>
              <p className="text-[#8a9bb0] text-xs">ថ្ងៃចុះឈ្មោះ</p>
              <p className="text-white text-sm">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("km-KH")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {!user && (
          <div className="mt-6 text-center">
            <p className="text-[#8a9bb0] text-sm mb-3">
              សូមចូលប្រើប្រាស់ដើម្បីមើលព័ត៌មានប្រូហ្វាល់
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 bg-[#3390ec] text-white rounded-xl font-medium hover:bg-[#2a7fd6] transition-colors"
            >
              {km.login}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
