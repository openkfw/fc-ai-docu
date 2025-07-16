// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Exploring Generative AI for Financial Cooperation",
  tagline: "From first ideas to proof-of-concepts",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.fretchen.eu",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // Use environment variable or default to GitHub Pages path
  baseUrl: process.env.NODE_ENV === "development" ? "/" : "/fc-ai-docu/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "fretchen", // Usually your GitHub org/user name.
  projectName: "fc-ai-docu", // Usually your repo name.

  // Custom fields for reusable project variables
  customFields: {
    teamName: "FC AI",
    contentType: "use cases", // e.g., "fact sheets", "use cases", "tutorials"
  },

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "de",
    locales: ["de"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/", // Serve docs from root
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/openkfw/fc-ai-docu/tree/main/",
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "AI Use Cases",
        logo: {
          alt: "AI Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Use Cases",
          },
          {
            href: "https://github.com/openkfw/fc-ai-docu",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Development",
            items: [
              {
                label: "GitHub Repository",
                href: "https://github.com/openkfw/fc-ai-docu",
              },
              {
                label: "Contributors",
                href: "https://github.com/openkfw/fc-ai-docu/graphs/contributors",
              },
              {
                label: "Issues",
                href: "https://github.com/openkfw/fc-ai-docu/issues",
              },
              {
                label: "Discussions",
                href: "https://github.com/openkfw/fc-ai-docu/discussions",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KfW Development Bank. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
