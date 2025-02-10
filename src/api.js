import axios from "axios";

const API = axios.create({
  baseURL: "https://treasure-backend-steel.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTeam = (teamData) => API.post("/create-team", teamData).then(res => res.data);
export const joinPortal = (data) => API.post("/join-portal", { mobileNumber: String(data.mobileNumber) }).then(res => res.data);
export const getMainQuestion = () => API.get("/main-question").then(res => res.data);
export const submitMainAnswer = (teamId, answer) => API.post("/submit-main-answer", { teamId, answer }).then(res => res.data);
export const getQuestions = (teamId) => API.get(`/questions/${teamId}`).then(res => res.data);
export const submitAnswer = (data) => API.post("/submit-answer", data).then(res => res.data);
export const getLeaderboard = () => API.get("/leaderboard").then(res => res.data);