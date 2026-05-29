import React from "react";
import HomePage from "./pages/HomePage";
import JobSeekerPage from "./pages/JobSeekerPage";
import RecruiterPage from "./pages/RecruiterPage";

type PageType = "home" | "job-seeker" | "recruiter";

function App() {
  const [currentPage, setCurrentPage] = React.useState<PageType>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "job-seeker":
        return <JobSeekerPage />;
      case "recruiter":
        return <RecruiterPage />;
      case "home":
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            📄 Resume Analyzer
          </button>
          <div className="space-x-4">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-4 py-2 rounded ${
                currentPage === "home"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("job-seeker")}
              className={`px-4 py-2 rounded ${
                currentPage === "job-seeker"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Job Seeker
            </button>
            <button
              onClick={() => setCurrentPage("recruiter")}
              className={`px-4 py-2 rounded ${
                currentPage === "recruiter"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Recruiter
            </button>
          </div>
        </div>
      </nav>

      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
