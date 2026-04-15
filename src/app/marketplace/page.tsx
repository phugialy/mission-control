import ProductCard from '@/components/marketplace/ProductCard';
import { Product } from '@/lib/marketplace-types';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'research-agent',
    name: 'Research Agent',
    description: 'Full research assistant — web search, memory management, citation formatting',
    category: 'starter-pack',
    price: 15,
    platforms: ['OpenClaw', 'Claude', 'GPTs'],
    rating: 0,
    reviews: 0,
    isFree: false,
  },
  {
    id: 'writer-agent',
    name: 'Writer Agent',
    description: 'Writing/editing assistant — tone analysis, structure feedback, revision workflows',
    category: 'starter-pack',
    price: 15,
    platforms: ['OpenClaw', 'Claude'],
    rating: 0,
    reviews: 0,
    isFree: false,
  },
  {
    id: 'coder-agent',
    name: 'Coder Agent',
    description: 'Development agent — repo context, tool access, code review patterns',
    category: 'starter-pack',
    price: 15,
    platforms: ['OpenClaw', 'Claude Code'],
    rating: 0,
    reviews: 0,
    isFree: false,
  },
  {
    id: 'diplomat-persona',
    name: 'The Diplomat',
    description: 'Tactful, consensus-building, avoids conflict',
    category: 'persona',
    price: 8,
    platforms: ['Universal'],
    rating: 0,
    reviews: 0,
    isFree: false,
  },
  {
    id: 'skeptic-persona',
    name: 'The Skeptic',
    description: 'Critical thinker, questions assumptions, digs into details',
    category: 'persona',
    price: 8,
    platforms: ['Universal'],
    rating: 0,
    reviews: 0,
    isFree: false,
  },
  {
    id: 'research-loop',
    name: 'Research Loop',
    description: 'Iterative research with source validation, gap detection, synthesis',
    category: 'workflow',
    price: 10,
    platforms: ['OpenClaw', 'Claude'],
    rating: 0,
    reviews: 0,
    isFree: false,
  },
];

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'starter-pack', name: 'Agent Starter Packs' },
  { id: 'persona', name: 'Persona Files' },
  { id: 'workflow', name: 'Workflow Templates' },
  { id: 'skill', name: 'Skills / Packages' },
  { id: 'industry', name: 'Industry Specific' },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Agent Marketplace
            </h1>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Drop-in AI agent configurations — starter packs, persona files, workflow templates, and skills. 
              Copy, paste, and your agent is ready.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
                Get Free Starter Pack
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Free Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-indigo-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Products</h2>
          <p className="text-gray-600 mb-4">Try before you buy — no email required</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg">Research Agent Lite</h3>
              <p className="text-gray-600 text-sm mt-1">Basic research workflow with search and memory</p>
              <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">FREE</span>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg">The Diplomat Persona</h3>
              <p className="text-gray-600 text-sm mt-1">Tactful, consensus-building personality</p>
              <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">FREE</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            {/* Search */}
            <div className="mb-6">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Agent Marketplace. Built for the AI agent ecosystem.</p>
        </div>
      </footer>
    </div>
  );
}