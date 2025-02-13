import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Remove createTeam API call
export const joinPortal = (data) => API.post("/join-team", data).then(res => res.data);
export const getMainQuestion = () => API.get("/main-question").then(res => res.data);
export const submitMainAnswer = (teamId, answer) => API.post("/submit-main-answer", { teamId, answer }).then(res => res.data);
export const getQuestions = (teamId) => API.get(`/questions/${teamId}`).then(res => res.data);
export const submitAnswer = (data) => API.post("/submit-answer", data).then(res => res.data);
export const getLeaderboard = () => API.get("/leaderboard").then(res => res.data);
export const getTimerStatus = () => API.get("/timer");
