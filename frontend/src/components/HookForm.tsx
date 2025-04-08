import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import apiClient from '../api/axios';

type FormData = {
  name: string;
  email: string;
  message: string;
};
export const HookForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const schema: ZodType<FormData> = z.object({
    name: z
      .string()
      .min(2, "Name must be atleast 2 characters")
      .max(30, "Name must not exceed 30 characters"),
    email: z.string().email("Please enter a valid email"),
    message: z
      .string()
      .min(20, "Feedback should be atleast 20 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: FormData) => {
    try {
      await apiClient.post('/api/feedback', data);
      setShowSuccess(true);
      reset();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8">
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6 shadow-md animate-fade-in">
          <p className="flex items-center">
            <span className="mr-2">✅</span>
            Thank you! Your feedback has been submitted successfully.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(submitData)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-secondary-700">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-3 rounded-lg border border-secondary-300 
                     bg-white text-secondary-900
                     focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                     transition-colors duration-200"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-secondary-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 rounded-lg border border-secondary-300 
                     bg-white text-secondary-900
                     focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                     transition-colors duration-200"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-secondary-700">
            Message
          </label>
          <textarea
            {...register("message")}
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-secondary-300 
                     bg-white text-secondary-900
                     focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                     transition-colors duration-200 resize-none"
            placeholder="Enter your feedback message"
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 text-lg font-medium text-white 
                   bg-gradient-to-r from-orange-400 to-rose-500 
                   hover:from-orange-500 hover:to-rose-600
                   rounded-lg shadow-lg hover:shadow-xl
                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 
                   transform hover:scale-105
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};
