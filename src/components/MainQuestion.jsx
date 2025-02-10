import { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { getMainQuestion, submitMainAnswer } from "../api";
import Questions from "./Questions";  // ✅ Import Questions component

const MainQuestion = ({ teamId, setQualified }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [qualified, setLocalQualified] = useState(false);  // ✅ Local state to track qualification

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getMainQuestion();
        console.log("Main Question Response:", res);
        if (!res?.question) throw new Error("Invalid response from server.");
        setQuestion(res.question);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        setMessage("Failed to load the question.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!teamId || !answer.trim()) {
      setMessage("Please enter an answer.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitMainAnswer(teamId, answer);
      console.log("Submit Answer Response:", res);

      if (!res || !res.message) throw new Error("Invalid response from server.");
      setMessage(res.message);

      // ✅ If the answer is correct, update both local and parent state
      if (res.qualified === true) {
        setLocalQualified(true);  // ✅ Instant UI switch
        setQualified(true);
      }
    } catch (error) {
      console.error("Error submitting answer:", error.response?.data || error.message);
      setMessage("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Instantly switch to the Questions page if qualified
  if (qualified) {
    return <Questions teamId={teamId} />;
  }

  return (
    <Card className="m-3">
      <CardContent>
        <Typography variant="h5">{loading ? "Loading question..." : question}</Typography>
        <TextField
          fullWidth
          label="Your Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitting}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="mt-2"
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} /> : "Submit"}
        </Button>
        {message && <Typography color="secondary" className="mt-2">{message}</Typography>}
      </CardContent>
    </Card>
  );
};

export default MainQuestion;
