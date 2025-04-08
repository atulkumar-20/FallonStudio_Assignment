import { HookForm } from "../components/HookForm";

export const Users = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500 mb-8 text-center">
          Submit Your Feedback
        </h2>
        <div className="bg-white/80 shadow-xl rounded-2xl backdrop-blur-lg backdrop-filter p-6">
          <HookForm />
        </div>
      </div>
    </div>
  );
};
