module.exports = {
  pluginOptions: {
    electronBuilder: {
      // externals: ["escpos", "escpos-usb"],
      preload: {
        preload: "src/preload/preload.ts",
        preloadClient: "src/preload/preloadClient.ts",
        preloadSupplier: "src/preload/preloadSupplier.ts",
        preloadProduct: "src/preload/preloadProduct.ts",
        preloadCategory: "src/preload/preloadCategory.ts"
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
          target: [
            "nsis"
          ]
        }
      }
    },
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },
  transpileDependencies: [
    "quasar"
  ]
};
