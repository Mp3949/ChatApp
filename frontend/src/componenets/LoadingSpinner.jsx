// components/LoadingSpinner.jsx
export default function LoadingSpinner() {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }