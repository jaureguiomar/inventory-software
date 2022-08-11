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
let win:BrowserWindow;
// const window = {
//    main: new BrowserWindow,
//    secondary: new BrowserWindow
// };

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
   { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
   let rootDir = app.getAppPath();
   const last = path.basename(rootDir);
   let icon_path = "";

   if(last == "app.asar")
      rootDir = path.dirname(app.getPath("exe"));
   if(isDevelopment)
      icon_path = path.join(__dirname, "src/assets/img/vue-typescript-full-sample-icon.ico");
   else
      icon_path = path.join(rootDir, "resources/img/vue-typescript-full-sample-icon.ico");

   // Create the browser window.
   const win = new BrowserWindow({
      width: 1024,
      height: 768,
      // fullscreen: true,
      icon: icon_path,
      webPreferences: {
         // Use pluginOptions.nodeIntegration, leave this alone
         // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
         nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
         contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
         preload: path.join(__dirname, "preload.js")
      }
   });
   // win.removeMenu();
   // win.maximize();

   if(process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
      if(!process.env.IS_TEST)
         win.webContents.openDevTools();

      autoUpdater.updateConfigPath = path.join(
         __dirname,
         "../app-update.yml" // change path if needed
      );
   } else {
      createProtocol("app");
      // Load the index.html when not in development
      win.loadURL("app://./index.html");
   }

   process.env.GH_TOKEN = "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";
   log.info("Checking for updates...");
   autoUpdater.autoDownload = true;
   autoUpdater.checkForUpdates();
   autoUpdater.quitAndInstall();
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if(process.platform !== "darwin")
      app.quit();
});

app.on("activate", () => {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
   if(BrowserWindow.getAllWindows().length === 0)
      createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
   if(isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
         await installExtension(VUEJS_DEVTOOLS);
      } catch (error) {
         // console.error("Vue Devtools failed to install:", e.toString())
         console.log("error", error);
      }
   }
   createWindow();
});

//////////////////
// Auto Updater //
autoUpdater.on("update-available", () => {
   log.info("update-available");
   dialog.showMessageBox(win, {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: "Update available",
   });
});
autoUpdater.on("update-not-available", () => {
   log.info("update-not-available");
   dialog.showMessageBox(win, {
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

   dialog.showMessageBox(win, {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: message,
   });
});

 ///////////////////////////////
// Listen for ipcMain Events //
ipcMain.on("new-window", function(e) {
   const window = new BrowserWindow({
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
   const setURL = process.env.NODE_ENV === "development" ? "http://localhost:8080/#/new-window" : `file://${__dirname}/index.html#/new-window`;

   window.on("close", function () {
      window.destroy();
   });
   window.loadURL(setURL);
   if(!process.env.IS_TEST)
      window.webContents.openDevTools();
   window.show();
});
///////////////////////////////////
///////////////////////////////////

// Exit cleanly on request from parent process in development mode.
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
