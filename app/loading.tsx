export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo placeholder */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-green-500 mx-auto mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Loading FridgeChef...
        </h2>
        
        {/* Loading spinner */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Loading message */}
        <p className="text-gray-600 mt-4">
          Preparing your culinary adventure...
        </p>
      </div>
    </div>
  )
} 