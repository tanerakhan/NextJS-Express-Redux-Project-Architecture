const isProd = process.env.NODE_ENV === "production";

// Enable importing of css stylesheets
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withImages = require("next-images");

/*
 * Gets the BASE_PATH from the command used to start this app.
 * If BASE_PATH is specified but it does not start with a "/"
 * then add it.
 */
function getBasePath() {
  var basePath = "";

  if (isProd && process.env.BASE_PATH) {
    if (process.env.BASE_PATH.startsWith("/")) {
      basePath = process.env.BASE_PATH;
    } else {
      basePath = "/" + process.env.BASE_PATH;
    }
  }

  console.log("getBasePath() : isProd = " + isProd);
  console.log("getBasePath() : basePath = " + basePath);

  return basePath;
}

/* module.exports = withCSS(
  withImages({
    assetPrefix: getBasePath(),

    publicRuntimeConfig: {
      basePath: getBasePath(),
    },
  })
); */

module.exports = withImages(
  withSass({
    assetPrefix: getBasePath(),
    publicRuntimeConfig: {
      basePath: getBasePath(),
    },
    experimental: { scss: true },
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]",
    },
  })
);
