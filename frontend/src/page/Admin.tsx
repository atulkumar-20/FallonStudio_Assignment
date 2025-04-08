import { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../api/axios";

interface Feedback {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "pending" | "positive" | "negative";
  createdAt: string;
}

interface Stats {
  total: number;
  positive: number;
  negative: number;
  pending: number;
}

export const Admin = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [stats, setStats] = useState<Stats>({
    total: 0,
    positive: 0,
    negative: 0,
    pending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const calculateStats = (data: Feedback[]): Stats => {
    return {
      total: data.length,
      positive: data.filter((f) => f.status === "positive").length,
      negative: data.filter((f) => f.status === "negative").length,
      pending: data.filter((f) => f.status === "pending").length,
    };
  };

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.get<Feedback[]>("/api/feedback");
      setFeedbacks(response.data);
      setStats(calculateStats(response.data));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch feedbacks";
      setError(errorMessage);
      console.error("Error fetching feedbacks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeedbackStatus = async (
    id: string,
    status: "positive" | "negative"
  ) => {
    try {
      const response = await apiClient.patch(`/api/feedback/${id}/status`, {
        status
      });

      if (response.data) {
        setFeedbacks((prevFeedbacks) => {
          const updatedFeedbacks = prevFeedbacks.map((feedback) =>
            feedback._id === id ? { ...feedback, status } : feedback
          );
          setStats(calculateStats(updatedFeedbacks));
          return updatedFeedbacks;
        });
        setSelectedFeedback(null);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message;
        console.error("Error updating feedback:", err);
        alert(`Failed to update feedback status: ${errorMessage}`);
      } else {
        console.error("Error updating feedback:", err);
        alert("An unexpected error occurred while updating the feedback status");
      }
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      await apiClient.delete(`/api/feedback/${id}`);
      setFeedbacks((prevFeedbacks) => {
        const updatedFeedbacks = prevFeedbacks.filter(
          (feedback) => feedback._id !== id
        );
        setStats(calculateStats(updatedFeedbacks));
        return updatedFeedbacks;
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message;
        console.error("Error deleting feedback:", err);
        alert(`Failed to delete feedback: ${errorMessage}`);
      } else {
        console.error("Error deleting feedback:", err);
        alert("An unexpected error occurred while deleting the feedback");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-800">Error: {error}</p>
          <button
            onClick={fetchFeedbacks}
            className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 to-rose-500 text-transparent bg-clip-text drop-shadow-lg mb-8 text-center">
          Admin Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-medium text-orange-900">
                Total Feedback
              </h3>
              <p className="text-3xl font-bold text-orange-600">
                {stats.total}
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-medium text-emerald-900">
                Positive
              </h3>
              <p className="text-3xl font-bold text-emerald-600">
                {stats.positive}
              </p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-medium text-rose-900">
                Negative
              </h3>
              <p className="text-3xl font-bold text-rose-600">
                {stats.negative}
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-medium text-amber-900">
                Pending
              </h3>
              <p className="text-3xl font-bold text-amber-600">
                {stats.pending}
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              <p className="text-gray-500">No feedback entries found</p>
            </div>
          ) : (
            feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-slate-900 truncate max-w-[200px]">
                    {feedback.name}
                  </h3>
                  <button
                    onClick={() => deleteFeedback(feedback._id)}
                    className="text-rose-600 hover:text-rose-800 px-2 py-1 flex-shrink-0"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-slate-600 text-sm mb-2 truncate">
                  {feedback.email}
                </p>
                <div className="h-24 overflow-y-auto mb-4">
                  <p className="text-slate-800 whitespace-pre-wrap break-words">
                    {feedback.message}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateFeedbackStatus(feedback._id, "positive")}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                        feedback.status === "positive"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-800 hover:bg-emerald-50"
                      }`}
                      disabled={feedback.status === "positive"}
                    >
                      Positive
                    </button>
                    <button
                      onClick={() => updateFeedbackStatus(feedback._id, "negative")}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                        feedback.status === "negative"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-slate-100 text-slate-800 hover:bg-rose-50"
                      }`}
                      disabled={feedback.status === "negative"}
                    >
                      Negative
                    </button>
                  </div>
                  <span className="text-sm text-slate-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Feedback Modal */}
        {selectedFeedback && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedFeedback(null)}
          >
            <div
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedFeedback.name}
                </h3>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mb-2">
                {selectedFeedback.email}
              </p>
              <div className="max-h-[40vh] overflow-y-auto mb-4 bg-gray-50 p-4 rounded">
                <p className="text-gray-800 whitespace-pre-wrap break-words">
                  {selectedFeedback.message}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  {selectedFeedback.status !== "positive" && (
                    <button
                      onClick={() =>
                        updateFeedbackStatus(selectedFeedback._id, "positive")
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    >
                      Mark Positive
                    </button>
                  )}
                  {selectedFeedback.status !== "negative" && (
                    <button
                      onClick={() =>
                        updateFeedbackStatus(selectedFeedback._id, "negative")
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      Mark Negative
                    </button>
                  )}
                  <button
                    onClick={() => deleteFeedback(selectedFeedback._id)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(selectedFeedback.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
