import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";
import styles from "./overview.module.css";

const clusters = {
  "Report Generation & Analysis": {
    description:
      "AI-powered solutions for automated report creation and data analysis",
    icon: "📊",
    color: "#e3f2fd",
    borderColor: "#1976d2",
    useCases: [
      {
        title: "Ministry Reporting Assistance",
        path: "/docs/use-cases/ministry-reporting",
        description:
          "AI-powered generation of comprehensive monitoring reports for portfolio managers",
        tags: [
          "report-generation",
          "nlp",
          "automation",
          "ministry-reporting",
          "pestle-analysis",
        ],
        difficulty: "intermediate",
        stakeholders: ["Portfolio Manager", "Project Manager"],
      },
      {
        title: "AI-Enhanced Ex-post Evaluation",
        path: "/docs/use-cases/evaluation",
        description:
          "Automated generation of goal achievement sections in evaluation reports",
        tags: [
          "report-generation",
          "evaluation",
          "document-analysis",
          "goal-assessment",
        ],
        difficulty: "advanced",
        stakeholders: ["Evaluator", "Portfolio Manager"],
      },
      {
        title: "Enhanced NGO Reporting",
        path: "/docs/use-cases/excel-to-report",
        description:
          "Transform Excel/CSV data into comprehensive narrative impact reports",
        tags: [
          "data-transformation",
          "excel-processing",
          "narrative-generation",
          "impact-reporting",
        ],
        difficulty: "intermediate",
        stakeholders: ["NGO Staff", "Humanitarian Worker"],
      },
    ],
  },
  "Data Processing & Extraction": {
    description:
      "Intelligent document analysis and information extraction systems",
    icon: "📄",
    color: "#f3e5f5",
    borderColor: "#7b1fa2",
    useCases: [
      {
        title: "Partner Report Validation",
        path: "/docs/use-cases/partner-report-precheck",
        description:
          "AI-driven validation with automated consistency checking of performance indicators",
        tags: [
          "validation",
          "partner-reports",
          "consistency-checking",
          "quality-assurance",
        ],
        difficulty: "intermediate",
        stakeholders: ["Project Manager", "Partner Organization"],
      },
      {
        title: "Contract Deliverable Identification",
        path: "/docs/use-cases/deliverables-identification",
        description:
          "Automated extraction and categorization of deliverables from complex contracts",
        tags: [
          "contract-analysis",
          "deliverable-extraction",
          "document-processing",
          "categorization",
        ],
        difficulty: "advanced",
        stakeholders: ["Technical Expert", "Project Manager"],
      },
    ],
  },
  "User-Facing Applications": {
    description:
      "Interactive AI solutions for enhanced user experience and accessibility",
    icon: "🤖",
    color: "#e8f5e8",
    borderColor: "#388e3c",
    useCases: [
      {
        title: "Document Process Navigation Chatbot",
        path: "/docs/use-cases/birth-certificate-chatbot",
        description:
          "Conversational AI for step-by-step guidance through administrative procedures",
        tags: [
          "chatbot",
          "conversational-ai",
          "procedural-guidance",
          "multi-language",
        ],
        difficulty: "intermediate",
        stakeholders: ["Citizens", "Refugees", "Administrative Staff"],
      },
      {
        title: "Knowledge Management System",
        path: "/docs/use-cases/knowledge-management-water",
        description:
          "Natural language search and retrieval for technical documentation",
        tags: [
          "knowledge-management",
          "semantic-search",
          "technical-documentation",
          "rag",
        ],
        difficulty: "intermediate",
        stakeholders: ["Technical Professional", "Knowledge Worker"],
      },
    ],
  },
};

const allTags = [
  "report-generation",
  "nlp",
  "automation",
  "evaluation",
  "document-analysis",
  "data-transformation",
  "validation",
  "chatbot",
  "knowledge-management",
  "semantic-search",
  "contract-analysis",
  "multi-language",
  "excel-processing",
  "procedural-guidance",
  "quality-assurance",
  "technical-documentation",
];

const difficultyColors = {
  beginner: "#4caf50",
  intermediate: "#ff9800",
  advanced: "#f44336",
};

function ClusterCard({ clusterName, cluster }) {
  return (
    <div
      className={clsx("card", styles.clusterCard)}
      style={{
        backgroundColor: cluster.color,
        borderLeft: `4px solid ${cluster.borderColor}`,
      }}>
      <div className="card__header">
        <h3>
          <span style={{ fontSize: "1.5em", marginRight: "0.5rem" }}>
            {cluster.icon}
          </span>
          {clusterName}
        </h3>
        <p>{cluster.description}</p>
      </div>
      <div className="card__body">
        <div className={styles.useCaseGrid}>
          {cluster.useCases.map((useCase, index) => (
            <Link
              key={index}
              to={useCase.path}
              className={clsx("card", styles.useCaseCard)}>
              <div className="card__header">
                <h4>{useCase.title}</h4>
                <div className={styles.difficultyBadge}>
                  <span
                    className={styles.difficultyDot}
                    style={{
                      backgroundColor: difficultyColors[useCase.difficulty],
                    }}></span>
                  {useCase.difficulty}
                </div>
              </div>
              <div className="card__body">
                <p>{useCase.description}</p>
                <div className={styles.stakeholders}>
                  <strong>For:</strong> {useCase.stakeholders.join(", ")}
                </div>
                <div className={styles.tags}>
                  {useCase.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                  {useCase.tags.length > 3 && (
                    <span className={styles.tagMore}>
                      +{useCase.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterableUseCases() {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("");

  const allUseCases = Object.values(clusters).flatMap(
    (cluster) => cluster.useCases
  );

  const filteredUseCases = allUseCases.filter((useCase) => {
    const tagMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => useCase.tags.includes(tag));
    const difficultyMatch =
      !selectedDifficulty || useCase.difficulty === selectedDifficulty;
    return tagMatch && difficultyMatch;
  });

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className={styles.filterSection}>
      <h3>Filter Use Cases</h3>

      <div className={styles.filterGroup}>
        <h4>By Difficulty:</h4>
        <div className={styles.difficultyFilters}>
          {["", "beginner", "intermediate", "advanced"].map((difficulty) => (
            <button
              key={difficulty}
              className={clsx(
                styles.filterButton,
                selectedDifficulty === difficulty && styles.active
              )}
              onClick={() => setSelectedDifficulty(difficulty)}>
              {difficulty || "All"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h4>By Tags:</h4>
        <div className={styles.tagFilters}>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={clsx(
                styles.tagFilter,
                selectedTags.includes(tag) && styles.active
              )}
              onClick={() => toggleTag(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filteredResults}>
        <h4>Results ({filteredUseCases.length})</h4>
        <div className={styles.useCaseGrid}>
          {filteredUseCases.map((useCase, index) => (
            <Link
              key={index}
              to={useCase.path}
              className={clsx("card", styles.useCaseCard)}>
              <div className="card__header">
                <h4>{useCase.title}</h4>
                <div className={styles.difficultyBadge}>
                  <span
                    className={styles.difficultyDot}
                    style={{
                      backgroundColor: difficultyColors[useCase.difficulty],
                    }}></span>
                  {useCase.difficulty}
                </div>
              </div>
              <div className="card__body">
                <p>{useCase.description}</p>
                <div className={styles.stakeholders}>
                  <strong>For:</strong> {useCase.stakeholders.join(", ")}
                </div>
                <div className={styles.tags}>
                  {useCase.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                  {useCase.tags.length > 3 && (
                    <span className={styles.tagMore}>
                      +{useCase.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Overview() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="AI Use Cases Overview"
      description="Explore AI-enhanced solutions for financial cooperation across different thematic clusters">
      <div className="container margin-vert--lg">
        <div className="text--center margin-bottom--xl">
          <h1>AI Use Cases in Financial Cooperation</h1>
          <p className="lead">
            Explore our portfolio of AI-enhanced solutions organized by thematic
            clusters. Each use case demonstrates practical applications of
            artificial intelligence in development finance and international
            cooperation.
          </p>
        </div>

        <section className={styles.clustersSection}>
          <h2>Thematic Clusters</h2>
          <p>
            Our use cases are organized into three main thematic clusters, each
            addressing different aspects of AI implementation in financial
            cooperation:
          </p>

          <div className={styles.clusterGrid}>
            {Object.entries(clusters).map(([clusterName, cluster]) => (
              <ClusterCard
                key={clusterName}
                clusterName={clusterName}
                cluster={cluster}
              />
            ))}
          </div>
        </section>

        <section className={styles.filterableSection}>
          <FilterableUseCases />
        </section>

        <section className={styles.quickAccess}>
          <h2>Quick Access</h2>
          <div className={styles.quickAccessGrid}>
            <Link to="/docs/glossary" className="card">
              <div className="card__header">
                <h3>📖 Glossary</h3>
              </div>
              <div className="card__body">
                Technical terms and concepts explained
              </div>
            </Link>

            <Link to="/docs/intro" className="card">
              <div className="card__header">
                <h3>🚀 Getting Started</h3>
              </div>
              <div className="card__body">
                Introduction to our AI initiative
              </div>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
