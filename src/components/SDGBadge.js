import React from "react";
import styles from "./SDGBadge.module.css";

const SDGBadge = ({ pillar, compact = false }) => {
  const pillars = {
    People: { emoji: "👥", color: "#e74c3c" },
    Prosperity: { emoji: "💰", color: "#f39c12" },
    Planet: { emoji: "🌍", color: "#27ae60" },
    Peace: { emoji: "☮️", color: "#3498db" },
    Partnership: { emoji: "🤝", color: "#9b59b6" },
  };

  const pillarInfo = pillars[pillar];

  if (!pillarInfo) {
    return null;
  }

  return (
    <span
      className={`${styles.badge} ${compact ? styles.compact : ""}`}
      style={{ backgroundColor: pillarInfo.color }}
      title={`SDG Pillar: ${pillar}`}>
      <span className={styles.emoji}>{pillarInfo.emoji}</span>
      {!compact && <span className={styles.text}>{pillar}</span>}
    </span>
  );
};

export default SDGBadge;
