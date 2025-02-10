import { useState } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { createTeam, joinPortal } from "../api";

const TeamForm = ({ setTeamId, setQualified, setTeamName }) => {
  const [teamName, setLocalTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    try {
      if (!mobileNumber) {
        setMessage("📱 Mobile number is required");
        return;
      }

      const res = await createTeam({ 
        teamName: teamName, 
        leaderName, 
        mobileNumber: String(mobileNumber)
      });

      console.log("Create Team Response:", res);

      if (res.success) {
        setMessage("🎉 " + res.message);
        setTeamId(res.teamId);
        setTeamName(teamName);
      } else {
        setMessage(res.message || "⚠️ Failed to create team");
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessage(error.response?.data?.message || "❌ An error occurred while creating the team.");
    }
  };

  const handleJoin = async () => {
    try {
      if (!mobileNumber) {
        setMessage("📱 Mobile number is required");
        return;
      }

      const res = await joinPortal({ mobileNumber: String(mobileNumber) });

      console.log("Join Portal Request:", { mobileNumber: String(mobileNumber) });
      console.log("Join Team Response:", res);

      if (res.teamId) {
        setMessage("🎊 " + res.message);
        setTeamId(res.teamId);
        setTeamName(res.teamData?.teamName || "Unknown Team");
        setQualified(res.teamData?.qualified || false);
      } else {
        setMessage(res.message || "⚠️ Failed to join team");
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessage(error.response?.data?.message || "❌ An error occurred while joining the team.");
    }
  };

  return (
    <Card 
      className="m-3"
      style={{
        maxWidth: 400,
        backgroundColor: "#f4e2c8", // Solid parchment-like color
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "5px 5px 20px rgba(0,0,0,0.5)",
        border: "2px solid #b8860b"
      }}
    >
      <CardContent>
        <Typography 
          variant="h5" 
          gutterBottom 
          style={{ textAlign: "center", fontWeight: "bold", color: "#8B4513" }}
        >
          🏴‍☠️ Join or Create a Team 🏆
        </Typography>

        <TextField 
          fullWidth 
          label="🏕 Team Name" 
          value={teamName} 
          onChange={(e) => setLocalTeamName(e.target.value)} 
          margin="normal"
          InputProps={{ style: { backgroundColor: "#fff", borderRadius: "8px" } }}
        />
        <TextField 
          fullWidth 
          label="🧭 Leader Name" 
          value={leaderName} 
          onChange={(e) => setLeaderName(e.target.value)} 
          margin="normal"
          InputProps={{ style: { backgroundColor: "#fff", borderRadius: "8px" } }}
        />
        <TextField 
          fullWidth 
          label="📞 Mobile Number" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value.trim())} 
          type="tel"
          margin="normal"
          InputProps={{ style: { backgroundColor: "#fff", borderRadius: "8px" } }}
        />

        <div className="flex space-x-4 mt-4" style={{ display: "flex", justifyContent: "center" }}>
          <Button 
            variant="contained" 
            style={{
              backgroundColor: "#d4af37",
              color: "#222",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "10px 15px",
              boxShadow: "3px 3px 10px rgba(0,0,0,0.3)",
              marginRight: "10px"
            }}
            onClick={handleCreate} 
            disabled={!teamName || !leaderName || !mobileNumber}
          >
            🏗 Create Team
          </Button>
          <Button 
            variant="contained" 
            style={{
              backgroundColor: "#8B0000",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "10px 15px",
              boxShadow: "3px 3px 10px rgba(0,0,0,0.3)"
            }}
            onClick={handleJoin} 
            disabled={!mobileNumber}
          >
            🚪 Join Team
          </Button>
        </div>

        {message && (
          <Typography 
            color="error" 
            className="mt-4" 
            variant="body2" 
            style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}
          >
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamForm;
