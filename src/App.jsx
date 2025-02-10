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

  // Toggle Leaderboard (Only for Mobile)
  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4"></h1>

      {/* Leaderboard Button (Only on Mobile) */}
      <button className="leaderboard-btn mobile-only" onClick={toggleLeaderboard}>
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

        {/* Always Visible Leaderboard on Desktop, Sidebar on Mobile */}
        <div className={`leaderboard-container ${showLeaderboard ? "show" : ""}`}>
          {/* Close Button (Only on Mobile) */}
          <button className="close-btn mobile-only" onClick={toggleLeaderboard}>❌</button>
          <Leaderboard />
        </div>

        {/* Click Outside to Close (Only on Mobile) */}
        {showLeaderboard && <div className="overlay mobile-only" onClick={toggleLeaderboard}></div>}
      </div>
    </div>
  );
}

export default App;
