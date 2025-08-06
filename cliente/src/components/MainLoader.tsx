const MainLoader = () => {
    
  return (
    <div className="flex flex-row items-center justify-center py-10 w-full min-h-screen bg-gray-300">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-6xl">DTH</span>
        <svg
          className="animate-spin h-6 w-6 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default MainLoader;
