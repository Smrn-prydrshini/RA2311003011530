const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcDEzOTNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTEzMCwiaWF0IjoxNzc3NzA0MjMwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNDU2YjA4YTQtYWNmMS00MWUwLWI0ODAtMGE3N2RlY2RhNzE3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2ltcmFuIHByaXlhZGFyc2hpbmkiLCJzdWIiOiI1NjY1MzIyMC0yOTRjLTQwNGUtYTdiNi1iOGNmNTU1MDJmZmIifSwiZW1haWwiOiJzcDEzOTNAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJzaW1yYW4gcHJpeWFkYXJzaGluaSIsInJvbGxObyI6InJhMjMxMTAwMzAxMTUzMCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjU2NjUzMjIwLTI5NGMtNDA0ZS1hN2I2LWI4Y2Y1NTUwMmZmYiIsImNsaWVudFNlY3JldCI6IlRmZ3hlQ0pRWXpZZVdta2oifQ.ty_-oOzjs3m2xjVQcCezcvluUBnP1BT9TIQABZNH_iw";

app.get("/notifications", async (req, res) => {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response?.data);
  console.log("STATUS:", err.response?.status);

  res.status(500).json({
    error: "Backend fetch failed",
    details: err.response?.data || err.message,
    status: err.response?.status || null,
  });
}
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});