module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ["escpos", "escpos-usb"],
      preload: {
        preload: "src/preloads/preload.ts",
        preloadClient: "src/preloads/preloadClient.ts",
        preloadSupplier: "src/preloads/preloadSupplier.ts",
        preloadProduct: "src/preloads/preloadProduct.ts",
        preloadCategory: "src/preloads/preloadCategory.ts",
        preloadUser: "src/preloads/preloadUser.ts",
        preloadUserRole: "src/preloads/preloadUserRole.ts"
      },
      builderOptions: {
        extraResources: [
          {
            from: "./src/assets/img",
            to: "./img"
          },
          {
            from: "./src/params",
            to: "./params/.config"
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
