import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Avatar, Divider } from "@mui/material";
import { EmojiEvents, AccountBalance } from "@mui/icons-material";
import { getLeaderboard } from "../api";

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getLeaderboard();
        if (!res || typeof res !== "object") {
          throw new Error("Invalid response format from server.");
        }
        const leaderboardData = res.data || res;
        const sortedTeams = Object.entries(leaderboardData)
          .map(([id, team]) => ({
            id,
            teamName: team.teamName || "Unknown Team",
            score: team.score || 0,
          }))
          .sort((a, b) => b.score - a.score);
        setTeams(sortedTeams);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    };
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (index) => {
    if (index === 0) return <EmojiEvents sx={{ color: "gold" }} />;
    if (index === 1) return <EmojiEvents sx={{ color: "silver" }} />;
    if (index === 2) return <EmojiEvents sx={{ color: "#CD7F32" }} />;
    return <AccountBalance sx={{ color: "#8B4513" }} />;
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 3, boxShadow: 4, borderRadius: 4, p: 2, bgcolor: "#f5f5f5" }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 3, color: "#333" }}>
          🏴‍☠️ Treasure Hunt Leaderboard
        </Typography>
        {teams.length > 0 ? (
          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            <List sx={{ bgcolor: "white", borderRadius: 2, p: 1, boxShadow: 2 }}>
              {teams.map((team, index) => (
                <>
                  <ListItem key={team.id} sx={{ display: "flex", alignItems: "center", gap: 2, p: 1 }}>
                    <Avatar sx={{ bgcolor: index < 3 ? "transparent" : "#F4A460", width: 36, height: 36 }}>
                      {getIcon(index)}
                    </Avatar>
                    <ListItemText
                      primary={`${index + 1}. ${team.teamName}`}
                      secondary={`${team.score} points`}
                      primaryTypographyProps={{ fontWeight: "bold", color: "#333" }}
                    />
                  </ListItem>
                  {index < teams.length - 1 && <Divider />}
                </>
              ))}
            </List>
          </Box>
        ) : (
          <Typography align="center" sx={{ color: "#666" }}>No teams on the leaderboard yet.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
