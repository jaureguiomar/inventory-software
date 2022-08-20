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
// let icon_path = "";
// let rootDir = app.getAppPath();
// const last = path.basename(rootDir);
const window = {
   main: null as any,
   client: {
      add: null as any,
      update: null as any,
      delete: null as any
   }
};

// if(last == "app.asar")
//    rootDir = path.dirname(app.getPath("exe"));
// if(isDevelopment)
//    icon_path = path.join(__dirname, "src/assets/img/vue-typescript-full-sample-icon.ico");
// else
//    icon_path = path.join(rootDir, "resources/img/vue-typescript-full-sample-icon.ico");

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
         setURL = process.env.NODE_ENV === "development" ? "http://localhost:8080/#/client-add" : `file://${__dirname}/index.html#/client-add`;
      else if(data.type === "update")
         setURL = process.env.NODE_ENV === "development" ? `http://localhost:8080/#/client-update/${data.id}` : `file://${__dirname}/index.html#/client-update/${data.id}`;
      else if(data.type === "delete")
         setURL = process.env.NODE_ENV === "development" ? `http://localhost:8080/#/client-delete/${data.id}` : `file://${__dirname}/index.html#/client-delete/${data.id}`;

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
