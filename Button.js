const Button = ({ text, handler, iconPath, type, loading }) => (
  <button
    onClick={handler}
    className={`inline-flex ${
      type === "playerPlay" || type === "playerPause"
        ? "w-12 rounded-4xl"
        : "w-full"
    } justify-center items-center px-3
     text-sm font-medium text-center text-white bg-blue-700 rounded-lg
      hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
       dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
  >
    {loading ? (
      <>
        <div className="animate-spin rounded-full h-8 mr-4 w-8 border-t-2 border-b-2 border-gray-900"></div>

        {"Writing to database..."}
      </>
    ) : (
      text
    )}

    {type === "icon" && (
      <svg
        aria-hidden="true"
        className="w-8 h-8 ml-2 mt-2 -mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d={iconPath}
          // d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    )}
    {type === "playerPlay" && (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fafafa"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#0f0b0b"
          strokeWidth="2.304"
        >
          {" "}
          <g id="Media / Play_Circle">
            {" "}
            <g id="Vector">
              {" "}
              <path
                d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
                stroke="#f9f6f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M10 15V9L15 12L10 15Z"
                stroke="#f9f6f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="Media / Play_Circle">
            {" "}
            <g id="Vector">
              {" "}
              <path
                d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
                stroke="#f9f6f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M10 15V9L15 12L10 15Z"
                stroke="#f9f6f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    )}
    {type === "playerPause" && (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M10 7C10.5523 7 11 7.44772 11 8V16C11 16.5523 10.5523 17 10 17C9.44771 17 9 16.5523 9 16V8C9 7.44772 9.44772 7 10 7Z"
            fill="#ffffff"
          ></path>{" "}
          <path
            d="M15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16V8Z"
            fill="#ffffff"
          ></path>{" "}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
            fill="#ffffff"
          ></path>{" "}
        </g>
      </svg>
    )}
  </button>
);
export default Button;
