import Mode from "frontmatter-markdown-loader/mode";
const path = require("path");
const glob = require("glob");

const markdownPaths = ["projects"];

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Ultimate Mercer",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Global CSS
   */
  css: [],
  loading: { color: "#121212" },

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/vue-lazyload"],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    [
      "bootstrap-vue/nuxt",
      {
        bootstrapVue: {
          bootstrapCSS: false,
          bootstrapVueCSS: false,
          componentsPlugin: ["NavbarPlugin"],
        },
      },
    ],
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"],
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: ["fab"],
          },
        ],
      },
    ],
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */

  build: {
    transpile: ["masonry-layout", "vue-lazyload"],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, "content"),
        loader: "frontmatter-markdown-loader",
      });
    },
  },

  generate: {
    routes: dynamicMarkdownRoutes(),
  },
};

function dynamicMarkdownRoutes() {
  return [].concat(
    ...markdownPaths.map((mdPath) => {
      return glob
        .sync(`${mdPath}/*.md`, { cwd: "content" })
        .map((filepath) => `${mdPath}/${path.basename(filepath, ".md")}`);
    })
  );
}
