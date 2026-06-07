import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Shield,
  Loader2,
  Save,
  Database,
  ShoppingCart,
  Link2,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { TelegramButton } from "@/components/TelegramButton";
import { km } from "@/utils/khmer";

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [connectionCode, setConnectionCode] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const utils = trpc.useUtils();

  const { data: activeConnection } = trpc.connection.getActive.useQuery();
  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: user?.role === "admin",
    retry: false,
  });

  const saveMutation = trpc.connection.save.useMutation({
    onSuccess: () => {
      setSaveSuccess(true);
      utils.connection.getActive.invalidate();
      utils.admin.stats.invalidate();
      setConnectionCode("");
      setTimeout(() => setSaveSuccess(false), 3000);
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectionCode.trim()) return;
    saveMutation.mutate({ code: connectionCode.trim() });
  };

  const isAdmin = user?.role === "admin";

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1c2732] flex flex-col items-center justify-center gap-4 px-4">
        <Shield className="w-12 h-12 text-[#8a9bb0]" />
        <p className="text-[#8a9bb0] text-center">សូមចូលប្រើប្រាស់ដើម្បីចូលទៅកាន់ផ្ទាំងគ្រប់គ្រង</p>
        <TelegramButton variant="primary" onClick={() => navigate("/login")}>
          {km.login}
        </TelegramButton>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#1c2732] flex flex-col items-center justify-center gap-4 px-4">
        <Shield className="w-12 h-12 text-[#e74c3c]" />
        <p className="text-[#e74c3c] text-center font-medium">
          អ្នកមិនមានសិទ្ធិចូលប្រើប្រាស់ផ្ទាំងគ្រប់គ្រងនេះទេ
        </p>
        <TelegramButton variant="default" onClick={() => navigate("/")}>
          {km.home}
        </TelegramButton>
      </div>
    );
  }

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
            <Shield className="w-5 h-5 text-[#3390ec]" />
            <h1 className="text-white font-semibold text-lg">{km.adminPanel}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#2b3a4a] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="w-4 h-4 text-[#3390ec]" />
                <p className="text-[#8a9bb0] text-xs">{km.activeConnections}</p>
              </div>
              <p className="text-white text-2xl font-bold">{stats.activeConnections}</p>
            </div>
            <div className="bg-[#2b3a4a] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-[#8a9bb0]" />
                <p className="text-[#8a9bb0] text-xs">{km.totalConnections}</p>
              </div>
              <p className="text-white text-2xl font-bold">{stats.totalConnections}</p>
            </div>
            <div className="bg-[#2b3a4a] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-4 h-4 text-[#2ecc71]" />
                <p className="text-[#8a9bb0] text-xs">{km.successfulOrders}</p>
              </div>
              <p className="text-[#2ecc71] text-2xl font-bold">{stats.successfulOrders}</p>
            </div>
            <div className="bg-[#2b3a4a] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-[#e74c3c]" />
                <p className="text-[#8a9bb0] text-xs">{km.failedOrders}</p>
              </div>
              <p className="text-[#e74c3c] text-2xl font-bold">{stats.failedOrders}</p>
            </div>
            <div className="bg-[#2b3a4a] rounded-xl p-4 col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-[#3390ec]" />
                <p className="text-[#8a9bb0] text-xs">{km.cachedProducts}</p>
              </div>
              <p className="text-white text-2xl font-bold">{stats.cachedProducts}</p>
            </div>
          </div>
        )}

        {/* Connection Code Form */}
        <div className="bg-[#2b3a4a] rounded-xl p-5 space-y-4">
          <h3 className="text-white font-medium flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#3390ec]" />
            ការកំណត់ការតភ្ជាប់ API
          </h3>

          {/* Current Connection Status */}
          <div className="p-3 rounded-lg bg-[#1c2732]">
            <p className="text-[#8a9bb0] text-xs mb-1">ការតភ្ជាប់បច្ចុប្បន្ន</p>
            {activeConnection ? (
              <div className="space-y-1">
                <p className="text-white text-sm font-mono">
                  URL: {activeConnection.apiUrlPreview}
                </p>
                <p className="text-[#8a9bb0] text-sm font-mono">
                  Key: {activeConnection.apiKeyPreview}...
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2ecc71]" />
                  <span className="text-[#2ecc71] text-xs">សកម្ម</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#e74c3c]" />
                <span className="text-[#e74c3c] text-sm">{km.noConnection}</span>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="text-[#8a9bb0] text-sm block mb-1.5">
                {km.enterConnectionCode}
              </label>
              <input
                type="text"
                value={connectionCode}
                onChange={(e) => setConnectionCode(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#1c2732] border border-[#1c2732] rounded-lg text-white placeholder:text-[#5a6a7a] focus:border-[#3390ec] focus:outline-none text-sm font-mono"
                placeholder={km.connectionCodePlaceholder}
                required
              />
            </div>

            {saveSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#2ecc71]/10 border border-[#2ecc71]/20">
                <CheckCircle className="w-4 h-4 text-[#2ecc71]" />
                <p className="text-sm text-[#2ecc71]">{km.connectionSaved}</p>
              </div>
            )}

            {saveMutation.isError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#e74c3c]/10 border border-[#e74c3c]/20">
                <XCircle className="w-4 h-4 text-[#e74c3c]" />
                <p className="text-sm text-[#e74c3c]">{km.connectionSaveError}</p>
              </div>
            )}

            <TelegramButton
              variant="primary"
              type="submit"
              icon={
                saveMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )
              }
              disabled={saveMutation.isPending}
              className="w-full"
            >
              {saveMutation.isPending ? km.loading : km.save}
            </TelegramButton>
          </form>
        </div>

        {/* Orders Table */}
        <div className="bg-[#2b3a4a] rounded-xl p-5">
          <h3 className="text-white font-medium mb-3">{km.orderHistory}</h3>
          <OrdersList />
        </div>
      </div>
    </div>
  );
}

function OrdersList() {
  const { data: orders, isLoading } = trpc.external.orders.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="w-5 h-5 text-[#3390ec] animate-spin" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <p className="text-[#8a9bb0] text-sm text-center py-4">
        មិនទាន់មានការទិញ
      </p>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-3 rounded-lg bg-[#1c2732]"
        >
          <div>
            <p className="text-white text-sm">{order.productId}</p>
            <p className="text-[#8a9bb0] text-xs">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("km-KH")
                : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                order.status === "success"
                  ? "bg-[#2ecc71]/20 text-[#2ecc71]"
                  : order.status === "failed"
                  ? "bg-[#e74c3c]/20 text-[#e74c3c]"
                  : "bg-[#f39c12]/20 text-[#f39c12]"
              }`}
            >
              {order.status === "success"
                ? "ជោគជ័យ"
                : order.status === "failed"
                ? "បរាជ័យ"
                : "កំពុងរង់ចាំ"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
