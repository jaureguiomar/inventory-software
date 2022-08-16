const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      externals: ["escpos", "escpos-usb"],
      preload: {
        preload: "src/preload.ts",
        preloadClient: "src/preloadClient.ts"
      },
      builderOptions: {
        extraResources: [
          {
            from: "./src/assets/img",
            to: "./img"
          }
        ],
        publish: [
          {
            provider: "github",
            owner: "jaureguiomar",
            private: true,
            repo: "vue-typescript-full-sample",
            releaseType: "draft"
          }
        ],
        win: {
          "target": [
              "nsis"
          ],
          icon: "src/assets/img/vue-typescript-full-sample-icon.ico",
        },
        nsis: {
          "installerIcon": "src/assets/img/vue-typescript-full-sample-icon.ico",
          "uninstallerIcon": "src/assets/img/vue-typescript-full-sample-icon.ico"
        }
      }
    }
  }
});
