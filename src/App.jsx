import { useState } from "react";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

function App() {
  const [Result, setResult] = useState("");
  const [themeColor, setThemeColor] = useState("bg-gray-800");
  const [savedResults, setSavedResults] = useState([]);

  const handleclicks = (value) => {
    if (/^[0-9.+\-*/]$/.test(value)) {
      setResult(Result === "0" ? value : Result + value);
    } else {
      switch (value) {
        case "=":
          try {
            setResult(eval(Result).toString());
          } catch {
            setResult("Error");
          }
          break;
        case "c":
          setResult("");
          break;
        case "+/-":
          setResult((parseFloat(Result) * -1).toString());
          break;
        case "%":
          setResult((parseFloat(Result) / 100).toString());
          break;
        case "x²":
          setResult(Math.pow(parseFloat(Result), 2).toString());
          break;
        case "x³":
          setResult(Math.pow(parseFloat(Result), 3).toString());
          break;
        case "√x":
          setResult(Math.sqrt(parseFloat(Result)).toString());
          break;
        case "←":
          setResult(Result.slice(0, -1));
          break;
        default:
          break;
      }
    }
  };

  const saveResult = () => {
    if (Result) {
      setSavedResults((prev) => {
        const updatedResults = [Result, ...prev];
        return updatedResults.slice(0, 9); // Limit the array to 9 results
      });
    }
  };

  const clearResults = () => {
    setSavedResults([]);
  };

  const deleteSingleResult = (index) => {
    setSavedResults((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSavedResultClick = (res) => {
    setResult(Result + res);
  };

  return (
    <main className="bg-gradient-to-l from-gray-900 to-gray-700 flex items-center justify-center min-h-screen px-4 py-12">
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">
        {/* Calculator */}
        <div className={`w-full max-w-lg ${themeColor} border border-gray-600 rounded-lg shadow-2xl`}>
          <div className="p-5 text-gray-100">
            <Display value={Result} />
            <Buttons Buttonclicked={handleclicks} />
            <button
              onClick={saveResult}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Save Result
            </button>
          </div>
        </div>

        {/* Saved Results */}
        <div className="w-full max-w-sm bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg border border-gray-600 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-100">Saved Results</h2>
            <button
              onClick={clearResults}
              className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2">
            {savedResults.length > 0 ? (
              savedResults.map((res, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-gray-200 bg-gray-800 py-2 px-3 rounded-md shadow-md border border-gray-700"
                >
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => handleSavedResultClick(res)}
                  >
                    {res}
                  </span>
                  <button
                    onClick={() => deleteSingleResult(index)}
                    className="text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No results saved yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
