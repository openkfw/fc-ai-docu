import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./UseCaseOverview.module.css";

// Define cluster metadata (visual appearance only)
const clusterMetadata = {
  "Report Generation & Analysis": {
    description:
      "AI-powered solutions for automated report creation and data analysis",
    icon: "📊",
    color: "#e3f2fd",
    borderColor: "#1976d2",
  },
  "Data Processing & Extraction": {
    description:
      "Intelligent document analysis and information extraction systems",
    icon: "📄",
    color: "#f3e5f5",
    borderColor: "#7b1fa2",
  },
  "User-Facing Applications": {
    description:
      "Interactive AI solutions for enhanced user experience and accessibility",
    icon: "🤖",
    color: "#e8f5e8",
    borderColor: "#388e3c",
  },
};

// Dynamically load all MDX files from use-cases directory
function loadUseCases() {
  const requireContext = require.context(
    "../../docs/use-cases",
    false,
    /\.mdx$/,
  );
  const useCases = [];

  requireContext.keys().forEach((fileName) => {
    try {
      const module = requireContext(fileName);
      const frontMatter = module.frontMatter || {};

      // Extract filename without extension for path
      const slug = fileName.replace("./", "").replace(".mdx", "");

      const useCase = {
        title: frontMatter.title || "Untitled",
        path: `/use-cases/${slug}`,
        description: frontMatter.description || "",
        tags: frontMatter.tags || [],
        stakeholders: frontMatter.stakeholders || [],
        clusters: frontMatter.clusters || [],
      };

      useCases.push(useCase);
    } catch (error) {
      console.warn(`Failed to load use case from ${fileName}:`, error);
    }
  });

  return useCases;
}

// Generate clusters dynamically from use cases
function generateClusters() {
  const useCases = loadUseCases();
  const clusters = {};

  // Initialize clusters from metadata
  Object.keys(clusterMetadata).forEach((clusterName) => {
    clusters[clusterName] = {
      ...clusterMetadata[clusterName],
      useCases: [],
    };
  });

  // Assign use cases to clusters
  useCases.forEach((useCase) => {
    useCase.clusters.forEach((clusterName) => {
      if (clusters[clusterName]) {
        clusters[clusterName].useCases.push(useCase);
      } else {
        console.warn(
          `Unknown cluster "${clusterName}" found in use case "${useCase.title}"`,
        );
      }
    });
  });

  return clusters;
}

// Generate all tags dynamically
function generateAllTags() {
  const useCases = loadUseCases();
  const tagSet = new Set();

  useCases.forEach((useCase) => {
    useCase.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

// Dynamic data
const clusters = generateClusters();
const allTags = generateAllTags();

function ClusterCard({ clusterName, cluster }) {
  return (
    <div
      className={clsx("card", styles.clusterCard)}
      style={{
        backgroundColor: cluster.color,
        borderLeft: `4px solid ${cluster.borderColor}`,
      }}
    >
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
              className={clsx("card", styles.useCaseCard)}
            >
              <div className="card__header">
                <h4>{useCase.title}</h4>
                <div className={styles.difficultyBadge}>
                  <span
                    className={styles.difficultyDot}
                    style={{
                      backgroundColor: difficultyColors[useCase.difficulty],
                    }}
                  ></span>
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

// Export all clusters for use in MDX
export const ThematicClusters = () => (
  <div className={styles.clusterGrid}>
    {Object.entries(clusters).map(([clusterName, cluster]) => (
      <ClusterCard
        key={clusterName}
        clusterName={clusterName}
        cluster={cluster}
      />
    ))}
  </div>
);

// Simplified cluster component - just use case cards without header
export const ThematicCluster = ({ name }) => {
  const cluster = clusters[name];

  if (!cluster) {
    console.warn(
      `Cluster "${name}" not found. Available clusters:`,
      Object.keys(clusters),
    );
    return null;
  }

  return (
    <div className={styles.useCaseGrid}>
      {cluster.useCases.map((useCase, index) => (
        <Link
          key={index}
          to={useCase.path}
          className={clsx("card", styles.useCaseCard)}
        >
          <div className="card__header">
            <h4>{useCase.title}</h4>
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
  );
};
