// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "API Standards hub",
  tagline: "WIP",
  url: "https://useoptic.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "opticdev", // Usually your GitHub org/user name.
  projectName: "api-standards-hub", // Usually your repo name.
  plugins: ["docusaurus-tailwindcss"],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebar.js"),
          path: "content",
          routeBasePath: "/",
          breadcrumbs: false,
          // Please change this to your repo.
          // editUrl: "https://github.com/facebook/docusaurus/edit/main/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "API Standards",
        items: [
          { label: "All Standards", position: "left", href: "/" },
          { label: "Naming", position: "left", href: "/standards/urls" },
          { label: "URLs", position: "left", href: "/standards/urls" },
          {
            label: "Breaking Changes",
            position: "left",
            href: "/standards/urls",
          },
          { label: "Security", position: "left", href: "/standards/security" },
          {
            html:
              "<span class='tailwind' ><button class=\"bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded\">\n" +
              "Start using (10) selected standards" +
              "</button></span>",
            href: "https://app.useoptic.com",
            id: "override-finish",
            position: "right",
          },
        ],
      },
      colorMode: {
        disableSwitch: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
