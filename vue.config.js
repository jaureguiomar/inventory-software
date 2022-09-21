module.exports = {
  pluginOptions: {
    electronBuilder: {
      // externals: ["escpos", "escpos-usb"],
      preload: {
        preload: "src/preload.ts",
        preloadClient: "src/preloadClient.ts",
        preloadSupplier: "src/preloadSupplier.ts",
        preloadProduct: "src/preloadProduct.ts",
        preloadCategory: "src/preloadCategory.ts"
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
            repo: "inventory-software",
            releaseType: "draft"
          }
        ],
        win: {
          "target": [
              "nsis"
          ],
          // icon: "src/assets/img/inventory-software-icon.ico",
        },
        // nsis: {
        //   "installerIcon": "src/assets/img/inventory-software-icon.ico",
        //   "uninstallerIcon": "src/assets/img/inventory-software-icon.ico"
        // }
      }
    }
  }
};
