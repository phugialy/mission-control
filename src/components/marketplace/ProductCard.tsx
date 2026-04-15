import { Product } from '@/lib/marketplace-types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryColors: Record<string, string> = {
    'starter-pack': 'bg-blue-100 text-blue-800',
    'persona': 'bg-purple-100 text-purple-800',
    'workflow': 'bg-green-100 text-green-800',
    'skill': 'bg-orange-100 text-orange-800',
    'industry': 'bg-red-100 text-red-800',
    'prompt-library': 'bg-teal-100 text-teal-800',
  };

  const formatCategory = (cat: string) => {
    return cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col">
      {/* Category Tag */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[product.category] || 'bg-gray-100'}`}>
          {formatCategory(product.category)}
        </span>
        {product.rating > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <span className="text-yellow-500 mr-1">★</span>
            {product.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Product Name */}
      <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-1 flex-1">{product.description}</p>

      {/* Platform Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {product.platforms.map((platform) => (
          <span key={platform} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {platform}
          </span>
        ))}
      </div>

      {/* Price & Action */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div>
          {product.isFree ? (
            <span className="text-green-600 font-semibold">Free</span>
          ) : (
            <span className="text-gray-900 font-bold text-lg">${product.price}</span>
          )}
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          {product.isFree ? 'Download' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
}