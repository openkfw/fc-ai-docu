import React from "react";
import styles from "./SDGBadge.module.css";

const SDGBadge = ({ pillar, compact = false }) => {
  const pillars = {
    People: {
      emoji: "👥",
      color: "#e74c3c",
      tooltip: "People: Human well-being, rights, and equity in AI development",
    },
    Prosperity: {
      emoji: "💰",
      color: "#f39c12",
      tooltip:
        "Prosperity: Inclusive economic development and fair opportunities",
    },
    Planet: {
      emoji: "🌍",
      color: "#27ae60",
      tooltip: "Planet: Environmental sustainability and climate action",
    },
    Peace: {
      emoji: "☮️",
      color: "#3498db",
      tooltip: "Peace: Security, inclusion, and reliable digital systems",
    },
    Partnership: {
      emoji: "🤝",
      color: "#9b59b6",
      tooltip: "Partnership: Collaborative approaches and knowledge sharing",
    },
  };

  const pillarInfo = pillars[pillar];

  if (!pillarInfo) {
    return null;
  }

  return (
    <span
      className={`${styles.badge} ${compact ? styles.compact : ""}`}
      style={{ backgroundColor: pillarInfo.color }}
      title={pillarInfo.tooltip}>
      <span className={styles.emoji}>{pillarInfo.emoji}</span>
      {!compact && <span className={styles.text}>{pillar}</span>}
    </span>
  );
};

export default SDGBadge;
