"use strict"
import { app, protocol, BrowserWindow, dialog } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import path from "path";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import getMAC from "getmac";
import { machineId } from "node-machine-id";
import fs from "fs";
import { window } from "@/background/window";
import "@/background/printer";
import "@/background/mysql/mysql";

// const lockInstance = app.requestSingleInstanceLock();
const isDevelopment = process.env.NODE_ENV !== "production";

protocol.registerSchemesAsPrivileged([
   { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
   // if(lockInstance)
   //    app.quit()

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
   window.main.removeMenu();
   window.main.maximize();

   const machine_id:string = await machineId();
   const mac_address:string = getMAC();
   const config_path = getAppPath() + "\\params\\.config";
   let config_content = "";

   try {
      config_content = fs.readFileSync(config_path, {
         encoding: "utf8",
         flag: "r"
      });
   } catch (error) {
      console.log("error", error);
   }

   window.main.webContents.on("did-finish-load", function () {
      window.main.webContents.send("setup-machine", {
         machine_id,
         mac_address,
         ip_server: config_content
      });
   });

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

function getAppPath() {
   let rootDir = app.getAppPath();
   const last = path.basename(rootDir);
   let app_path = "";

   if(last == "app.asar")
      rootDir = path.dirname(app.getPath("exe"));
   if(isDevelopment)
      app_path = path.join(__dirname, "src");
   else
      app_path = path.join(rootDir, "resources");

   return app_path;
}
