import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
export const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50">
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="animate-pulse-slow mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-rose-500 text-transparent bg-clip-text drop-shadow-lg mb-4">
                Feedback Collector Form
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-orange-800 mb-12 leading-relaxed">
              We value your feedback! Help us improve by sharing your thoughts
              and experiences with us.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/users"
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-orange-400 to-rose-500 rounded-xl hover:from-orange-500 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Feedback
              </Link>
              <Link
                to="/admin"
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
};
