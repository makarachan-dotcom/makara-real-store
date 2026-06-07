import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { useNavigate } from "react-router";
import {
  Shield,
  KeyRound,
  Globe,
  Save,
  Trash2,
  AlertCircle,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Activity,
  Loader2,
} from "lucide-react";

export default function Admin() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [encoded, setEncoded] = useState("");
  const [storeName, setStoreName] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { data: configs, isLoading: configsLoading, refetch } =
    trpc.store.list.useQuery(undefined, {
      enabled: user?.role === "admin",
    });

  const decodeMutation = trpc.store.decodeAndSave.useMutation({
    onSuccess: (data) => {
      setFeedback({
        type: "success",
        message: data.message,
      });
      setEncoded("");
      setStoreName("");
      refetch();
      setTimeout(() => setFeedback(null), 4000);
    },
    onError: (error) => {
      setFeedback({
        type: "error",
        message: error.message,
      });
      setTimeout(() => setFeedback(null), 4000);
    },
  });

  const deleteMutation = trpc.store.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const updateStatusMutation = trpc.store.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#1c2732" }}
      >
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#3390ec" }} />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 p-4"
        style={{ backgroundColor: "#1c2732" }}
      >
        <Shield className="w-12 h-12" style={{ color: "#e74c3c" }} />
        <h1 className="text-lg font-semibold" style={{ color: "#ffffff" }}>
          ចូលប្រើប្រាស់តែអ្នកគ្រប់គ្រង់ប៉ុណ្ណោះ
        </h1>
        <p className="text-sm text-center" style={{ color: "#6b7f94" }}>
          ទំព័រនេះតម្រូវឱ្យមានសិទ្ធិអ្នកគ្រប់គ្រង់
        </p>
        <button
          onClick={() => navigate("/")}
          className="telegram-btn-primary px-4 py-2 text-sm flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          ត្រឡប់ទៅទំព័រដើម
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!encoded.trim()) return;

    decodeMutation.mutate({
      encoded: encoded.trim(),
      storeName: storeName.trim() || undefined,
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("តើអ្នកប្រាកដជាចង់លុបការកំណត់នេះមែនទេ?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1c2732" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: "rgba(28, 39, 50, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #2b3a4a",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center w-9 h-9 transition-colors hover:bg-white/10"
                style={{ borderRadius: "10px" }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: "#6b7f94" }} />
              </button>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center w-10 h-10"
                  style={{
                    backgroundColor: "#e74c3c",
                    borderRadius: "12px",
                  }}
                >
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-bold" style={{ color: "#ffffff" }}>
                    ផ្ទាំងគ្រប់គ្រង់
                  </h1>
                  <p className="text-xs" style={{ color: "#6b7f94" }}>
                    Admin Panel
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1"
              style={{
                backgroundColor: "rgba(231, 76, 60, 0.2)",
                borderRadius: "8px",
              }}
            >
              <Activity className="w-3 h-3" style={{ color: "#e74c3c" }} />
              <span className="text-xs" style={{ color: "#e74c3c" }}>
                Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-4 space-y-4">
        {/* Feedback */}
        {feedback && (
          <div
            className="flex items-center gap-2 p-3 animate-fade-in"
            style={{
              backgroundColor:
                feedback.type === "success"
                  ? "rgba(46, 204, 113, 0.1)"
                  : "rgba(231, 76, 60, 0.1)",
              borderRadius: "12px",
              border: `1px solid ${
                feedback.type === "success"
                  ? "rgba(46, 204, 113, 0.2)"
                  : "rgba(231, 76, 60, 0.2)"
              }`,
            }}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" style={{ color: "#2ecc71" }} />
            ) : (
              <XCircle className="w-4 h-4" style={{ color: "#e74c3c" }} />
            )}
            <span
              className="text-xs"
              style={{
                color:
                  feedback.type === "success" ? "#2ecc71" : "#e74c3c",
              }}
            >
              {feedback.message}
            </span>
          </div>
        )}

        {/* Add Config Form */}
        <div
          className="animate-fade-in"
          style={{
            backgroundColor: "#2b3a4a",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <h2
            className="text-sm font-semibold mb-4 flex items-center gap-2"
            style={{ color: "#ffffff" }}
          >
            <KeyRound className="w-4 h-4" style={{ color: "#3390ec" }} />
            បញ្ចូលការកំណត់ហាង
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#6b7f94" }}>
                Base64 Encoded String
              </label>
              <textarea
                value={encoded}
                onChange={(e) => setEncoded(e.target.value)}
                placeholder="conn_eyJrIjoic2tf..."
                required
                rows={3}
                className="telegram-input w-full text-sm font-mono resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#6b7f94" }}>
                ឈ្មោះហាង (ស្រេចចិត្ត)
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="My Store"
                className="telegram-input w-full text-sm"
              />
            </div>

            <div
              className="flex items-start gap-2 p-3"
              style={{
                backgroundColor: "rgba(243, 156, 18, 0.1)",
                borderRadius: "10px",
              }}
            >
              <AlertCircle
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: "#f39c12" }}
              />
              <p className="text-xs" style={{ color: "#f39c12" }}>
                បញ្ចូល base64 string ដែលបានផ្តល់ដោយក្រុមហ៊ុន
                Format: conn_eyJrIjoic2tf... (decoded: {"{"}k: API_KEY, u: API_URL{"}"})
              </p>
            </div>

            <button
              type="submit"
              disabled={decodeMutation.isPending || !encoded.trim()}
              className="telegram-btn-primary w-full py-2.5 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {decodeMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {decodeMutation.isPending ? "កំពុងរក្សា..." : "រក្សាទុក"}
            </button>
          </form>
        </div>

        {/* Config List */}
        <div
          className="animate-fade-in"
          style={{
            backgroundColor: "#2b3a4a",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <h2
            className="text-sm font-semibold mb-4 flex items-center gap-2"
            style={{ color: "#ffffff" }}
          >
            <Globe className="w-4 h-4" style={{ color: "#3390ec" }} />
            ការកំណត់ទាំងអស់
          </h2>

          {configsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#3390ec" }} />
            </div>
          ) : configs && configs.length > 0 ? (
            <div className="space-y-2">
              {configs.map((config) => (
                <div
                  key={config.id}
                  className="p-3 animate-fade-in"
                  style={{
                    backgroundColor: "#1c2732",
                    borderRadius: "10px",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color: "#ffffff" }}>
                        {config.storeName}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5"
                        style={{
                          backgroundColor:
                            config.isActive === "yes"
                              ? "rgba(46, 204, 113, 0.2)"
                              : "rgba(231, 76, 60, 0.2)",
                          borderRadius: "6px",
                          color:
                            config.isActive === "yes" ? "#2ecc71" : "#e74c3c",
                        }}
                      >
                        {config.isActive === "yes" ? "សកម្ម" : "ផ្អាក"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: config.id,
                            isActive: config.isActive === "yes" ? "no" : "yes",
                          })
                        }
                        className="p-1.5 transition-colors hover:bg-white/10"
                        style={{ borderRadius: "6px" }}
                        title="ប្តូរស្ថានភាព"
                      >
                        <Activity className="w-3.5 h-3.5" style={{ color: "#6b7f94" }} />
                      </button>
                      <button
                        onClick={() => handleDelete(config.id)}
                        className="p-1.5 transition-colors hover:bg-white/10"
                        style={{ borderRadius: "6px" }}
                        title="លុប"
                      >
                        <Trash2 className="w-3.5 h-3.5" style={{ color: "#e74c3c" }} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "#6b7f94" }}>
                        API_URL:
                      </span>
                      <span
                        className="text-xs font-mono truncate"
                        style={{ color: "#8a9bb0" }}
                      >
                        {config.apiUrl}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "#6b7f94" }}>
                        API_KEY:
                      </span>
                      <span
                        className="text-xs font-mono"
                        style={{ color: "#8a9bb0" }}
                      >
                        {config.apiKey.substring(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Globe className="w-8 h-8 mx-auto mb-2" style={{ color: "#4a5e73" }} />
              <p className="text-xs" style={{ color: "#6b7f94" }}>
                មិនទាន់មានការកំណត់
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
