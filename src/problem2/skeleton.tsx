export function CurrencySwapSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white/20 rounded-lg" />
          </div>
          <div className="h-10 bg-white/10 rounded-lg mb-2 animate-pulse" />
          <div className="h-5 bg-white/10 rounded-lg w-3/4 mx-auto animate-pulse" />
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-white/10 rounded w-12 animate-pulse" />
            <div className="h-12 bg-white/10 rounded-xl animate-pulse" />
            <div className="h-16 bg-white/10 rounded-xl animate-pulse" />
          </div>

          <div className="flex justify-center -my-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full animate-pulse" />
          </div>

          <div className="space-y-2 mb-6">
            <div className="h-4 bg-white/10 rounded w-12 animate-pulse" />
            <div className="h-12 bg-white/10 rounded-xl animate-pulse" />
            <div className="h-16 bg-white/10 rounded-xl animate-pulse" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-white/10 rounded w-24 animate-pulse" />
              <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
            </div>
          </div>

          <div className="h-14 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-xl animate-pulse mb-6" />

          <div className="pt-6 border-t border-white/20">
            <div className="h-3 bg-white/10 rounded w-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
