import { useState, useEffect } from "react";
import TeamForm from "./components/TeamForm";
import MainQuestion from "./components/MainQuestion";
import Questions from "./components/Questions";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function App() {
  const [teamId, setTeamId] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [qualified, setQualified] = useState(false);

  // ✅ Force re-render when qualified changes
  useEffect(() => {}, [qualified]);

  return (
    <div className="container">
      <h1 className="text-center mt-4"></h1>
      <div className="content-container">
        <div className="form-container">
          {!teamId ? (
            <TeamForm setTeamId={setTeamId} setQualified={setQualified} setTeamName={setTeamName} />
          ) : qualified ? (
            <Questions teamId={teamId} teamName={teamName} />  // ✅ Questions show immediately
          ) : (
            <MainQuestion teamId={teamId} setQualified={setQualified} />
          )}
        </div>
        <div className="leaderboard-container">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

export default App;
