const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcDEzOTNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzY5OTc0NywiaWF0IjoxNzc3Njk4ODQ3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTQ1MzdiZDQtY2E3ZS00N2M4LWJkODEtMjM0YzQ3YTc3MTVmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2ltcmFuIHByaXlhZGFyc2hpbmkiLCJzdWIiOiI1NjY1MzIyMC0yOTRjLTQwNGUtYTdiNi1iOGNmNTU1MDJmZmIifSwiZW1haWwiOiJzcDEzOTNAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJzaW1yYW4gcHJpeWFkYXJzaGluaSIsInJvbGxObyI6InJhMjMxMTAwMzAxMTUzMCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjU2NjUzMjIwLTI5NGMtNDA0ZS1hN2I2LWI4Y2Y1NTUwMmZmYiIsImNsaWVudFNlY3JldCI6IlRmZ3hlQ0pRWXpZZVdta2oifQ.n7-sUzfWbCkRhWySOvqQQCxKcjE6mqD4_LSTIwfnbAI";

async function Log(stack, level, pkg, message) {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
  } catch (error) {
    console.log("Logging failed:", error.message);
  }
}

async function fetchNotifications() {
  try {
    await Log("frontend", "info", "api", "fetching notifications");

    const response = await fetch(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.notifications) {
      throw new Error("Notifications not found. Check token/API response.");
    }

    const weights = {
      Placement: 3,
      Result: 2,
      Event: 1
    };

    const sorted = data.notifications.sort((a, b) => {
      if (weights[b.Type] !== weights[a.Type]) {
        return weights[b.Type] - weights[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = sorted.slice(0, 10);

    console.log("\nTop 10 Priority Notifications:");
    console.log(top10);

    await Log("frontend", "info", "component", "top 10 generated");
  } catch (error) {
    console.log("Error:", error.message);
    await Log("frontend", "error", "api", "fetch failed");
  }
}

fetchNotifications();