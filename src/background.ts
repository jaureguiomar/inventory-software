"use strict"
import {
   app, protocol,
   BrowserWindow, dialog,
   ipcMain
} from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import path from "path";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
// import escpos from "escpos";
// import USB from "escpos-usb";

const isDevelopment = process.env.NODE_ENV !== "production";
const app_port = getAppPort();
// let icon_path = "";
// let rootDir = app.getAppPath();
// const last = path.basename(rootDir);
const window = {
   main: null as any,
   client: {
      add: null as any,
      update: null as any,
      delete: null as any,
      see: null as any
   },
   supplier: {
      add: null as any,
      update: null as any,
      delete: null as any,
      see: null as any
   },
   product: {
      add: null as any,
      update: null as any,
      delete: null as any,
      see: null as any
   },
   category: {
      add: null as any,
      update: null as any,
      delete: null as any,
      see: null as any
   },
   user: {
      add: null as any,
      update: null as any,
      delete: null as any,
      see: null as any
   }
};

// if(last == "app.asar")
//    rootDir = path.dirname(app.getPath("exe"));
// if(isDevelopment)
//    icon_path = path.join(__dirname, "src/assets/img/inventory-software-icon.ico");
// else
//    icon_path = path.join(rootDir, "resources/img/inventory-software-icon.ico");

protocol.registerSchemesAsPrivileged([
   { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
   window.main = new BrowserWindow({
      width: 1024,
      height: 768,
      // fullscreen: true,
      // icon: icon_path,
      webPreferences: {
         nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
         contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
         preload: path.join(__dirname, "preload.js")
      }
   });
   // window.main.removeMenu();
   window.main.maximize();

   if(process.env.WEBPACK_DEV_SERVER_URL) {
      await window.main.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
      if(!process.env.IS_TEST)
         window.main.webContents.openDevTools();

      autoUpdater.updateConfigPath = path.join(
         __dirname,
         "../app-update.yml"
      );
   } else {
      createProtocol("app");
      window.main.loadURL("app://./index.html");
   }

   process.env.GH_TOKEN = "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";
   log.info("Checking for updates...");
   autoUpdater.autoDownload = true;
   autoUpdater.checkForUpdates();
   autoUpdater.quitAndInstall();
}
function getAppPort() {
   const server_url = (process.env.WEBPACK_DEV_SERVER_URL) ? process.env.WEBPACK_DEV_SERVER_URL : "";
   const splitted_server_url = server_url.split(":");
   let port = -1;
   if(splitted_server_url.length === 3) {
      const dots = splitted_server_url[2];
      const splitted_dots = dots.split("/");
      if(splitted_dots.length === 2)
         port = parseInt(splitted_dots[0]);
   }
   return port;
}
function buildAppRoute() {
   let route = "";
   if(process.env.NODE_ENV === "development")
      route = `http://localhost:${ app_port }/#`;
   else
      route = `file://${__dirname}/index.html#`;
   return route;
}

app.on("window-all-closed", () => {
   if(process.platform !== "darwin")
      app.quit();
});

app.on("activate", () => {
   if(BrowserWindow.getAllWindows().length === 0)
      createWindow();
});

app.on("ready", async () => {
   if(isDevelopment && !process.env.IS_TEST) {
      try {
         await installExtension(VUEJS_DEVTOOLS);
      } catch (error) {
         console.log("error", error);
      }
   }
   createWindow();
});

//////////////////
// Auto Updater //
autoUpdater.on("update-available", () => {
   log.info("update-available");
   dialog.showMessageBox(window.main, {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: "Update available",
   });
});
autoUpdater.on("update-not-available", () => {
   log.info("update-not-available");
   dialog.showMessageBox(window.main, {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: "No updates available",
   });
});
autoUpdater.on("download-progress", (progress) => {
   log.info("download-progress");
   log.info("progress", progress);
});
autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
   log.info("update-downloaded");
   dialog.showMessageBox({
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Application Update",
      message: process.platform === "win32" ? releaseNotes : releaseName,
      detail: "A new version has been downloaded. Restart the application to apply the updates."
   }).then((returnValue) => {
      autoUpdater.quitAndInstall()
      if(returnValue.response === 0)
         autoUpdater.quitAndInstall()
   });
});
autoUpdater.on("error", (message) => {
   log.info("update-error");
   log.info(message);
   console.log("update-error", message);

   dialog.showMessageBox(window.main, {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: message,
   });
});

 ///////////////////////////////
// Listen for ipcMain Events //
// Client
ipcMain.on("client-module-window", function(e, data) {
   if(!window.client[data.type] || window.client[data.type].isDestroyed()) {
      window.client[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadClient.js")
         }
      });
      // window.client[data.type].removeMenu();
      window.client[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/client-add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/client-update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/client-delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/client-see/${ data.id }`;

      window.client[data.type].loadURL(setURL);
      window.client[data.type].show();
      if(!process.env.IS_TEST)
         window.client[data.type].webContents.openDevTools();

      window.client[data.type].webContents.once("did-finish-load", function () {
         window.client[data.type].webContents.send("client-module-window-reply", data);
      });
      window.client[data.type].once("close", function () {
         window.client[data.type].destroy();
         window.client[data.type] = null;
      });
   } else {
      window.client[data.type].focus();
   }
});
ipcMain.on("client-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.client[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("client-module-window-dialog-reply");
   });
});
ipcMain.on("client-module-window-close", function(e, data) {
   window.client[data.type].destroy();
   window.client[data.type] = null;
   window.main.webContents.send("main-window-client-module-reply", data);
});

// Supplier
ipcMain.on("supplier-module-window", function(e, data) {
   if(!window.supplier[data.type] || window.supplier[data.type].isDestroyed()) {
      window.supplier[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadSupplier.js")
         }
      });
      // window.supplier[data.type].removeMenu();
      window.supplier[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/supplier-add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/supplier-update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/supplier-delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/supplier-see/${ data.id }`;

      window.supplier[data.type].loadURL(setURL);
      window.supplier[data.type].show();
      if(!process.env.IS_TEST)
         window.supplier[data.type].webContents.openDevTools();

      window.supplier[data.type].webContents.once("did-finish-load", function () {
         window.supplier[data.type].webContents.send("supplier-module-window-reply", data);
      });
      window.supplier[data.type].once("close", function () {
         window.supplier[data.type].destroy();
         window.supplier[data.type] = null;
      });
   } else {
      window.supplier[data.type].focus();
   }
});
ipcMain.on("supplier-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.supplier[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("supplier-module-window-dialog-reply");
   });
});
ipcMain.on("supplier-module-window-close", function(e, data) {
   window.supplier[data.type].destroy();
   window.supplier[data.type] = null;
   window.main.webContents.send("main-window-supplier-module-reply", data);
});

// Product
ipcMain.on("product-module-window", function(e, data) {
   if(!window.product[data.type] || window.product[data.type].isDestroyed()) {
      window.product[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadProduct.js")
         }
      });
      // window.product[data.type].removeMenu();
      window.product[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/product-add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/product-update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/product-delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/product-see/${ data.id }`;

      window.product[data.type].loadURL(setURL);
      window.product[data.type].show();
      if(!process.env.IS_TEST)
         window.product[data.type].webContents.openDevTools();

      window.product[data.type].webContents.once("did-finish-load", function () {
         window.product[data.type].webContents.send("product-module-window-reply", data);
      });
      window.product[data.type].once("close", function () {
         window.product[data.type].destroy();
         window.product[data.type] = null;
      });
   } else {
      window.product[data.type].focus();
   }
});
ipcMain.on("product-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.product[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("product-module-window-dialog-reply");
   });
});
ipcMain.on("product-module-window-close", function(e, data) {
   window.product[data.type].destroy();
   window.product[data.type] = null;
   window.main.webContents.send("main-window-product-module-reply", data);
});

// Category
ipcMain.on("category-module-window", function(e, data) {
   if(!window.category[data.type] || window.category[data.type].isDestroyed()) {
      window.category[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadCategory.js")
         }
      });
      // window.category[data.type].removeMenu();
      window.category[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/category-add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/category-update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/category-delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/category-see/${ data.id }`;

      window.category[data.type].loadURL(setURL);
      window.category[data.type].show();
      if(!process.env.IS_TEST)
         window.category[data.type].webContents.openDevTools();

      window.category[data.type].webContents.once("did-finish-load", function () {
         window.category[data.type].webContents.send("category-module-window-reply", data);
      });
      window.category[data.type].once("close", function () {
         window.category[data.type].destroy();
         window.category[data.type] = null;
      });
   } else {
      window.category[data.type].focus();
   }
});
ipcMain.on("category-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.category[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("category-module-window-dialog-reply");
   });
});
ipcMain.on("category-module-window-close", function(e, data) {
   window.category[data.type].destroy();
   window.category[data.type] = null;
   window.main.webContents.send("main-window-category-module-reply", data);
});

// User
ipcMain.on("user-module-window", function(e, data) {
   if(!window.user[data.type] || window.user[data.type].isDestroyed()) {
      window.user[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadUser.js")
         }
      });
      // window.user[data.type].removeMenu();
      window.user[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/user-add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/user-update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/user-delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/user-see/${ data.id }`;

      window.user[data.type].loadURL(setURL);
      window.user[data.type].show();
      if(!process.env.IS_TEST)
         window.user[data.type].webContents.openDevTools();

      window.user[data.type].webContents.once("did-finish-load", function () {
         window.user[data.type].webContents.send("user-module-window-reply", data);
      });
      window.user[data.type].once("close", function () {
         window.user[data.type].destroy();
         window.user[data.type] = null;
      });
   } else {
      window.user[data.type].focus();
   }
});
ipcMain.on("user-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.user[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("user-module-window-dialog-reply");
   });
});
ipcMain.on("user-module-window-close", function(e, data) {
   window.user[data.type].destroy();
   window.user[data.type] = null;
   window.main.webContents.send("main-window-user-module-reply", data);
});
///////////////////////////////////
///////////////////////////////////

if(isDevelopment) {
   if(process.platform === "win32") {
      process.on("message", (data) => {
         if(data === "graceful-exit")
            app.quit();
      });
   } else {
      process.on("SIGTERM", () => {
         app.quit();
      });
   }
}
