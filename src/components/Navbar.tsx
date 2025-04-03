
import { Coffee } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 bg-white shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-job-blue-500 text-white p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
            <path d="M3 7h18" />
            <path d="M8 21h8" />
            <path d="M12 10v6" />
            <path d="m15 13-3 3-3-3" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-job-blue-800">JobScraperPro</h1>
      </div>
      <Button
        variant="outline"
        className="flex gap-2 items-center border-job-teal-500 text-job-teal-700 hover:bg-job-teal-50"
        asChild
      >
        <a href="https://buymeacoffee.com/wwachira" target="_blank" rel="noopener noreferrer">
          <Coffee size={18} />
          <span>Buy Me a Coffee</span>
        </a>
      </Button>
    </nav>
  );
};

export default Navbar;
