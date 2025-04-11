import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Page not found.</p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-200 transition"
      >
        Go Back
      </button>
    </div>
  );
}
