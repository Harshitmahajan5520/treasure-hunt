import { useState } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { joinPortal } from "../api";

const TeamForm = ({ setTeamId, setQualified, setTeamName }) => {
  const [teamCode, setTeamCode] = useState("");
  const [message, setMessage] = useState("");

  const handleJoin = async () => {
    try {
      if (!teamCode) {
        setMessage("⚠️ Team Code is required");
        return;
      }

      const res = await joinPortal({ teamCode });

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
        maxWidth: "100%",
        width: "90%",
        backgroundColor: "#f4e2c8",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "5px 5px 20px rgba(0,0,0,0.5)",
        border: "2px solid #b8860b",
        margin: "auto",
      }}
    >
      <CardContent>
        <Typography 
          variant="h5" 
          gutterBottom 
          style={{ textAlign: "center", fontWeight: "bold", color: "#8B4513" }}
        >
          🚀 Join a Team
        </Typography>

        <TextField 
          fullWidth 
          label="🔢 6-Digit Team Code" 
          value={teamCode} 
          onChange={(e) => setTeamCode(e.target.value.trim())} 
          margin="normal"
          InputProps={{ style: { backgroundColor: "#fff", borderRadius: "8px" } }}
        />

        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            marginTop: "15px" 
          }}
        >
          <Button 
            variant="contained" 
            style={{
              backgroundColor: "#8B0000",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "10px 15px",
              boxShadow: "3px 3px 10px rgba(0,0,0,0.3)",
              width: "100%",
              maxWidth: "200px",
            }}
            onClick={handleJoin} 
            disabled={!teamCode}
          >
            🚪 Join Team
          </Button>
        </div>

        {message && (
          <Typography 
            color="error" 
            variant="body2" 
            style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}
          >
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamForm;
