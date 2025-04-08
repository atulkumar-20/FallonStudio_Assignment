import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-100 to-rose-100 py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-secondary-700 font-medium">Created by:</span>
          <span className="text-orange-600 font-semibold">Atul Kumar</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="https://github.com/atulkumar-20/FallonStudio_Assignment"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 
                     text-secondary-700 hover:text-secondary-900 transition-all duration-200
                     shadow-sm hover:shadow-md"
          >
            <span>GitHub</span>
          </Link>

          <Link
            to="/users"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-rose-500 
                     text-white font-medium hover:from-orange-500 hover:to-rose-600 
                     transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Give Feedback
          </Link>
        </div>
      </div>
    </footer>
  );
};
