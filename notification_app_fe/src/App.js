import React, { useState } from "react";

const DATA = {
  notifications: [
    {
      ID: "a07afa2e",
      Type: "Placement",
      Message: "Marvell Technology Inc. hiring",
      Timestamp: "2026-05-02 03:45:33",
    },
    {
      ID: "17f6d563",
      Type: "Placement",
      Message: "Alphabet Inc hiring",
      Timestamp: "2026-05-01 20:14:39",
    },
    {
      ID: "897a8edc",
      Type: "Placement",
      Message: "Marriott hiring",
      Timestamp: "2026-05-01 15:45:27",
    },
    {
      ID: "488322c3",
      Type: "Placement",
      Message: "Meta hiring",
      Timestamp: "2026-05-01 13:14:21",
    },
    {
      ID: "d040b7d3",
      Type: "Result",
      Message: "internal results declared",
      Timestamp: "2026-05-02 02:45:03",
    },
    {
      ID: "b5871b9f",
      Type: "Result",
      Message: "internal update",
      Timestamp: "2026-05-02 02:44:09",
    },
    {
      ID: "0d0b5737",
      Type: "Result",
      Message: "mid-sem results",
      Timestamp: "2026-05-01 20:44:33",
    },
    {
      ID: "aa68bba0",
      Type: "Result",
      Message: "project review",
      Timestamp: "2026-05-01 18:14:57",
    },
    {
      ID: "30972b31",
      Type: "Result",
      Message: "end-sem results",
      Timestamp: "2026-05-01 18:14:03",
    },
    {
      ID: "c3b39c10",
      Type: "Event",
      Message: "cult fest",
      Timestamp: "2026-05-01 11:14:15",
    },
  ],
};

// priority weight (THIS is what makes it real priority)
const priorityWeight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const colors = {
  Placement: "#1b5e20",
  Result: "#0d47a1",
  Event: "#e65100",
};

export default function App() {
  const [view, setView] = useState("priority");

  // ALL → latest first
  const allSorted = [...DATA.notifications].sort(
    (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
  );

  // PRIORITY → type weight + latest time
  const prioritySorted = [...DATA.notifications].sort((a, b) => {
    const typeDiff = priorityWeight[b.Type] - priorityWeight[a.Type];
    if (typeDiff !== 0) return typeDiff;

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const list = view === "all" ? allSorted : prioritySorted;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Notifications</h2>

        <div style={styles.tabs}>
          <button
            onClick={() => setView("all")}
            style={view === "all" ? styles.activeBtn : styles.btn}
          >
            All
          </button>

          <button
            onClick={() => setView("priority")}
            style={view === "priority" ? styles.activeBtn : styles.btn}
          >
            Priority
          </button>
        </div>
      </div>

      <div style={styles.container}>
        {list.map((item) => (
          <div key={item.ID} style={styles.card(colors[item.Type])}>
            <div style={styles.row}>
              <span style={styles.type}>{item.Type}</span>
              <span style={styles.time}>{item.Timestamp}</span>
            </div>

            <div style={styles.message}>{item.Message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial",
    background: "#f5f5f5",
    minHeight: "100vh",
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    margin: 0,
  },

  tabs: {
    display: "flex",
    gap: "10px",
  },

  btn: {
    padding: "6px 12px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },

  activeBtn: {
    padding: "6px 12px",
    border: "1px solid #000",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
  },

  container: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  card: (borderColor) => ({
    background: "#fff",
    padding: "12px",
    borderLeft: `5px solid ${borderColor}`,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  }),

  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#666",
  },

  type: {
    fontWeight: "bold",
  },

  time: {
    fontSize: "11px",
  },

  message: {
    marginTop: "6px",
    fontSize: "14px",
  },
};