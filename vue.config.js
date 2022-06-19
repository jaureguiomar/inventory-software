const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      externals: ["escpos", "escpos-usb"],
      preload: "src/preload.js",
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
            repo: "inventory-software",
            releaseType: "draft"
          }
        ],
        win: {
          "target": [
              "nsis"
          ],
          icon: "src/assets/img/inventory-icon.ico",
        },
        nsis: {
          "installerIcon": "src/assets/img/inventory-icon.ico",
          "uninstallerIcon": "src/assets/img/inventory-icon.ico"
        }
      }
    }
  }
});
