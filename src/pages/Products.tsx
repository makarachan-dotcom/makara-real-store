import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ShoppingCart, Package, Loader2 } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { sanitizeTelegramHtml } from "@/utils/emojiParser";
import { TelegramButton } from "@/components/TelegramButton";
import { TelegramModal } from "@/components/TelegramModal";
import { km } from "@/utils/khmer";

interface ProductItem {
  id: string | number;
  name?: string;
  name_en_html?: string;
  description?: string;
  desc_en?: string;
  price?: string | number;
  image_url?: string;
  [key: string]: unknown;
}

export default function Products() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [buyerInfo, setBuyerInfo] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const { data: products, isLoading } = trpc.external.products.useQuery();
  const purchaseMutation = trpc.external.purchase.useMutation({
    onSuccess: () => {
      setPurchaseSuccess(true);
      setTimeout(() => {
        setPurchaseSuccess(false);
        setSelectedProduct(null);
        setBuyerInfo("");
      }, 2000);
    },
  });

  const handlePurchase = () => {
    if (!selectedProduct) return;
    purchaseMutation.mutate({
      productId: String(selectedProduct.id),
      qty: 1,
      buyerInfo,
    });
  };

  const productList: ProductItem[] = Array.isArray(products) ? (products as ProductItem[]) : [];

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
            <ShoppingCart className="w-5 h-5 text-[#3390ec]" />
            <h1 className="text-white font-semibold text-lg">{km.productCatalog}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-[#3390ec] animate-spin" />
            <p className="text-[#8a9bb0]">{km.loading}</p>
          </div>
        ) : productList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Package className="w-12 h-12 text-[#8a9bb0]" />
            <p className="text-[#8a9bb0]">{km.noProducts}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {productList.map((product, index) => {
              const name = sanitizeTelegramHtml(
                product.name_en_html || product.name || ""
              );
              const description = sanitizeTelegramHtml(
                product.desc_en || product.description || ""
              );
              const price = product.price;
              const imageUrl = product.image_url;

              return (
                <div
                  key={String(product.id) || index}
                  className="bg-[#2b3a4a] rounded-xl overflow-hidden hover:bg-[#354554] transition-colors cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex gap-3 p-3">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt=""
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-[#1c2732] flex items-center justify-center flex-shrink-0">
                        <Package className="w-8 h-8 text-[#8a9bb0]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">
                        {name || "ផលិតផល"}
                      </h3>
                      <p className="text-[#8a9bb0] text-xs mt-1 line-clamp-2">
                        {description || ""}
                      </p>
                      {price && (
                        <p className="text-[#3390ec] font-semibold text-sm mt-2">
                          ${price}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      <TelegramModal
        isOpen={!!selectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          setPurchaseSuccess(false);
          setBuyerInfo("");
        }}
        title={km.buyNow}
      >
        {purchaseSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2ecc71]/20 flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-[#2ecc71]" />
            </div>
            <p className="text-white text-lg font-medium">{km.success}</p>
            <p className="text-[#8a9bb0] text-sm mt-1">
              ការទិញបានជោគជ័យ
            </p>
          </div>
        ) : selectedProduct ? (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-[#2b3a4a]">
              <h3 className="text-white font-medium">
                {sanitizeTelegramHtml(
                  selectedProduct.name_en_html ||
                    selectedProduct.name ||
                    ""
                ) || "ផលិតផល"}
              </h3>
              {selectedProduct.price && (
                <p className="text-[#3390ec] font-semibold mt-1">
                  ${selectedProduct.price}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[#8a9bb0] text-sm">{"ព័ត៌មានអ្នកទិញ"}</label>
              <input
                type="text"
                value={buyerInfo}
                onChange={(e) => setBuyerInfo(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#2b3a4a] border border-[#2b3a4a] rounded-lg text-white placeholder:text-[#5a6a7a] focus:border-[#3390ec] focus:outline-none text-sm"
                placeholder="បញ្ចូលព័ត៌មានអ្នកទិញ"
              />
            </div>

            {purchaseMutation.isError && (
              <div className="p-3 rounded-lg bg-[#e74c3c]/10 border border-[#e74c3c]/20">
                <p className="text-sm text-[#e74c3c]">
                  {purchaseMutation.error?.message || String(km.error)}
                </p>
              </div>
            )}

            <TelegramButton
              variant="primary"
              icon={<ShoppingCart className="w-5 h-5" />}
              onClick={handlePurchase}
              disabled={purchaseMutation.isPending}
              className="w-full"
            >
              {purchaseMutation.isPending ? km.loading : km.buyNow}
            </TelegramButton>
          </div>
        ) : null}
      </TelegramModal>
    </div>
  );
}
