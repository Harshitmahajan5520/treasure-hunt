import { useState } from "react";
import TeamForm from "./components/TeamForm";
import MainQuestion from "./components/MainQuestion";
import Questions from "./components/Questions";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function App() {
  const [teamId, setTeamId] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [qualified, setQualified] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Toggle Leaderboard
  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4"></h1>

      {/* Centered Leaderboard Button */}
      <button className="leaderboard-btn" onClick={toggleLeaderboard}>
      🏆 Leaderboard
      </button>

      <div className="content-container">
        <div className="form-container">
          {!teamId ? (
            <TeamForm setTeamId={setTeamId} setQualified={setQualified} setTeamName={setTeamName} />
          ) : qualified ? (
            <Questions teamId={teamId} teamName={teamName} />
          ) : (
            <MainQuestion teamId={teamId} setQualified={setQualified} />
          )}
        </div>

        {/* Sidebar Leaderboard */}
        <div className={`leaderboard-container ${showLeaderboard ? "show" : ""}`}>
          <button className="close-btn" onClick={toggleLeaderboard}>❌</button>
          <Leaderboard />
        </div>

        {/* Click Outside to Close */}
        {showLeaderboard && <div className="overlay" onClick={toggleLeaderboard}></div>}
      </div>
    </div>
  );
}

export default App;
