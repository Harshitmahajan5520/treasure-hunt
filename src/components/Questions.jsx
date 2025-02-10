import { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Container, Grid } from "@mui/material";
import { getQuestions, submitAnswer } from "../api";

const Questions = ({ teamId, teamName }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestions(teamId);
        if (!res || !Array.isArray(res)) throw new Error("☠️ The treasure map is missing!");
        setQuestions(res);
        setAnswers(res.reduce((acc, q) => ({ ...acc, [q.questionId]: "" }), {}));
      } catch (error) {
        setMessage("⚠️ Failed to retrieve the ancient riddles!");
      }
    };
    fetchQuestions();
  }, [teamId]);

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (questionId) => {
    if (!answers[questionId]?.trim()) {
      alert("📜 Please enter an answer before sailing forward!");
      return;
    }
    try {
      const res = await submitAnswer({ teamId, questionId, answer: answers[questionId] });
      alert(res.message);
    } catch (error) {
      alert("☠️ The Kraken disrupted your answer! Try again.");
    }
  };

  return (
    <Container maxWidth="md" className="questions-container">
      <Typography variant="h4" className="team-name">
        🏴‍☠️ Team: {teamName || "Unknown Crew"}
      </Typography>

      {message && <Typography color="error">{message}</Typography>}

      <div className="questions-list">
        <Grid container spacing={2}>
          {questions.map((question) => (
            <Grid item xs={12} md={6} key={question.questionId}>
              <Card className="question-card">
                <CardContent>
                  <Typography variant="h6" className="question-text">🗺️ {question.question}</Typography>
                  <TextField
                    fullWidth
                    label="🗝 Enter your answer"
                    value={answers[question.questionId] || ""}
                    onChange={(e) => handleAnswerChange(question.questionId, e.target.value)}
                    className="answer-field"
                  />
                  <Button 
                    variant="contained" 
                    className="submit-button" 
                    onClick={() => handleSubmit(question.questionId)}
                  >
                    ⚔️ Submit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <style>
        {`
          .questions-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 90vh;
            background: url('https://www.transparenttextures.com/patterns/aged-paper.png');
            padding: 20px;
            border-radius: 12px;
            box-shadow: 5px 5px 20px rgba(0,0,0,0.5);
          }
          .team-name {
            text-align: center;
            font-weight: bold;
            font-family: 'Pirata One', cursive;
            color: #FFFFFF;
            margin-bottom: 20px;
            text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
          }
          .questions-list {
            overflow-y: auto;
            max-height: 75vh;
            padding-bottom: 20px;
          }
          .question-card {
            background: #fff8dc;
            padding: 15px;
            border-radius: 12px;
            box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
            transition: transform 0.2s ease-in-out;
          }
          .question-card:hover {
            transform: scale(1.02);
          }
          .question-text {
            font-weight: bold;
            font-family: 'Pirata One', cursive;
            color: #8B0000;
          }
          .answer-field {
            background: #fff;
            border-radius: 8px;
            padding: 8px;
          }
          .submit-button {
            background-color: #d4af37 !important;
            color: #222 !important;
            font-weight: bold;
            border-radius: 8px;
            padding: 10px 15px;
            box-shadow: 3px 3px 10px rgba(0,0,0,0.3);
            display: block;
            margin: 15px auto 0;
          }
        `}
      </style>
    </Container>
  );
};

export default Questions;
