import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { ProblemCardProps } from "../Type";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to {""}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Code Challenge
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          I have a strong desire to learn, explore new technologies, and
          continuously improve myself.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
          <div className="text-gray-600">Total Problems</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">24h</div>
          <div className="text-gray-600">Estimated Time</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            Easy-Hard
          </div>
          <div className="text-gray-600">Difficulty Range</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProblemCard
          number={1}
          title="Three ways to sum to n"
          description="Implement three different approaches to calculate sum from 1 to n"
          difficulty="Easy"
          time="2 hours"
          tags={["JavaScript", "Algorithms"]}
        />
        <ProblemCard
          number={2}
          title="Fancy Form"
          description="Create a currency swap form with real-time validation and exchange rates"
          difficulty="Medium"
          time="16 hours"
          tags={["React", "TypeScript", "Zod"]}
        />
        <ProblemCard
          number={3}
          title="Messy React"
          description="Refactor a poorly structured React application into a clean, maintainable codebase"
          difficulty="Hard"
          time="6 hours"
          tags={["md", "react", "refactoring"]}
        />
      </div>
    </div>
  );
};

const ProblemCard = ({
  number,
  title,
  description,
  difficulty,
  time,
  tags = [],
  disabled = false,
}: ProblemCardProps) => {
  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-200 overflow-hidden group ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">{number}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              {difficulty && (
                <span
                  className={`inline-block text-xs font-semibold px-2 py-1 rounded-full border ${getDifficultyColor(
                    difficulty
                  )} mt-1`}
                >
                  {difficulty}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 min-h-[3rem]">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          {time && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
          )}
          <div className="flex items-center gap-1"></div>
        </div>

        {disabled ? (
          <button
            disabled
            className="block w-full text-center bg-gray-300 text-gray-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
          >
            Coming Soon
          </button>
        ) : (
          <Link
            to={`/problem${number}`}
            className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all group-hover:shadow-lg"
          >
            Let's go →
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
