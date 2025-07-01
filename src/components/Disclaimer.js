import React from "react";
import Link from "@docusaurus/Link";
import styles from "./Disclaimer.module.css";

const Disclaimer = () => {
  return (
    <div className={styles.disclaimer}>
      <blockquote>
        <strong>Note:</strong> This document describes a Proof of Concept (PoC)
        for AI-enhanced solutions in various application domains. All specific
        implementation details, technical configurations, and organizational
        references have been generalized for public use.{" "}
        <Link to="/glossary" className={styles.glossaryLink}>
          📖 Technical terms are explained in our glossary
        </Link>
        .
      </blockquote>
    </div>
  );
};

export default Disclaimer;
