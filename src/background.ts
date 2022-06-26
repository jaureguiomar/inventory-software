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
         nodeIntegration: (process.env
         .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
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
ipcMain.on("async-message", function(e) {
   dialog.showErrorBox("System message", "Async message");
   // Send a message back
   e.sender.send("async-message-reply", "Main process opened the dialog");
});
// ipcMain.on("printer-table", async function(e, data) {
//   let image_path = "";
//   if(isDevelopment) {
//     image_path = path.join(__dirname, "src/assets/img/vue-typescript-full-sample-logo-ticket.png");
//   } else {
//     let rootDir = app.getAppPath();
//     let last = path.basename(rootDir);
//     if(last == "app.asar")
//         rootDir = path.dirname(app.getPath("exe"))
//     image_path = path.join(rootDir, "resources/img/vue-typescript-full-sample-logo-ticket.png");
//   }

//   // Format date properly
//   let fecha_final = data["fecha_final"];
//   let fecha_result = fecha_final;
//   if(fecha_final) {
//     let splitted_fecha_final = fecha_final.split("-");
//     if(splitted_fecha_final.length == 3) {
//       let year = splitted_fecha_final[0];
//       let month = splitted_fecha_final[1];
//       let day = splitted_fecha_final[2];
//       fecha_result = day + "/" + month + "/" + year;
//     }
//   }

//   // Split comanda data by category
//   let comanda_products = [];
//   let comanda_drinks = [];
//   for(let i = 0; i < data["comanda"].length; i++) {
//       const curr_comanda = data["comanda"][i];
//       const curr_producto = curr_comanda["producto"];
//       const curr_categoria = curr_producto["categoria"];
//       if(curr_categoria["lugar"] == "c")
//         comanda_products.push(curr_comanda);
//       else if(curr_categoria["lugar"] == "b")
//         comanda_drinks.push(curr_comanda);
//   }

//   // Print "products"
//   if(comanda_products.length > 0) {
//     const device  = new escpos.USB(); // 0x0416, 0x5011
//     const options = { encoding: "utf8" }
//     const printer = new escpos.Printer(device, options);

//     escpos.Image.load(image_path, function(image) {
//       device.open(function() {
//         printer.size(1, 1)
//         printer.align("CT")
//         printer.image(image, "s8")
//           .then(() => {
//             printer.size(0.5, 0.5)
//             printer.feed(1)
//             if(fecha_result && data["hora_final"]) {
//               printer.text("Fecha")
//               printer.text(fecha_result)
//               printer.text(data["hora_final"]);
//               printer.feed(1)
//             }
//             printer.text("GUERRERO 25")
//             printer.text("CENTRO 47980");
//             printer.text("DEGOLLADO")
//             printer.text("JALISCO");
//             printer.feed(1)
//             printer.text("Mesero")
//             printer.text(data["mesero"]["nombre"] + " " + data["mesero"]["apellidos"])
//             printer.feed(1)
//             printer.text("Id de venta")
//             printer.text("#" + data["idventa"])
//             printer.feed(1)
//             printer.text("No de mesa")
//             printer.text("#" + data["mesa"]["nomesa"])
//             printer.feed(1)
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("CT")
//             printer.text("Cant-Prod-Prec")
//             printer.text("----------")
//             printer.align("LT")

//             let total = 0;
//             for(let i = 0; i < comanda_products.length; i++) {
//               const curr_comanda = comanda_products[i];
//               const curr_subtotal = ((parseFloat(curr_comanda["subtotal_modificado"]) != 0) ? curr_comanda["subtotal_modificado"] : curr_comanda["subtotal"]);
//               total += parseFloat(curr_subtotal);

//               printer.text(
//                 curr_comanda["cantidad"] + ".- " + curr_comanda["producto"]["producto"] + " $" + curr_subtotal + " ($" + curr_comanda["precio"] + " c/u)"
//               )
//               printer.feed(1)
//             }
//             total = total.toFixed(2);

//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("LT")
//             .tableCustom(
//               [
//                 { text: "Subtotal:", align: "LEFT", width: 0.33 },
//                 { text: "$" + total, align: "RIGHT", width: 0.33 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Impuestos:", align: "LEFT", width: 0.33 },
//                 { text: "$0.00", align: "RIGHT", width: 0.33 }
//               ]
//             )
//             printer.feed(1)
//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("LT")
//             .tableCustom(
//               [
//                 { text: "Metodo pago:", align: "LEFT", width: 0.33 },
//                 {
//                   text: parseInt(data["metodo_pago"] == 1) ? "Efectivo" : parseInt(data["metodo_pago"] == 2) ? "T. de Credito" :  parseInt(data["metodo_pago"]) == 3 ? "T. de Debito" : "Efectivo",
//                   align: "RIGHT",
//                   width: 0.33
//                 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Total pagado:", align: "LEFT", width: 0.33 },
//                 { text: "$" + total, align: "RIGHT", width: 0.33 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Cambio:", align: "LEFT", width: 0.33 },
//                 { text: "$0.00", align: "RIGHT", width: 0.33 }
//               ]
//             )
//             printer.feed(1)
//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.text("GRACIAS POR SU")
//             printer.text("COMPRA")
//             printer.feed(1)
//             printer.drawLine()
//             printer.cut()
//             printer.close()
//           });
//       });
//     });
//   }

//   // Print drinks
//   if(comanda_drinks.length > 0) {
//     escpos.Image.load(image_path, function(image) {
//       const device  = new escpos.USB(); // 0x0416, 0x5011
//       const options = { encoding: "utf8" }
//       const printer = new escpos.Printer(device, options);

//       device.open(function() {
//         printer.size(1, 1)
//         printer.align("CT")
//         printer.image(image, "s8")
//           .then(() => {
//             printer.size(0.5, 0.5)
//             printer.feed(1)
//             if(fecha_result && data["hora_final"]) {
//               printer.text("Fecha")
//               printer.text(fecha_result)
//               printer.text(data["hora_final"]);
//               printer.feed(1)
//             }
//             printer.text("GUERRERO 25")
//             printer.text("CENTRO 47980");
//             printer.text("DEGOLLADO")
//             printer.text("JALISCO");
//             printer.feed(1)
//             printer.text("Mesero")
//             printer.text(data["mesero"]["nombre"] + " " + data["mesero"]["apellidos"])
//             printer.feed(1)
//             printer.text("Id de venta")
//             printer.text("#" + data["idventa"])
//             printer.feed(1)
//             printer.text("No de mesa")
//             printer.text("#" + data["mesa"]["nomesa"])
//             printer.feed(1)
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("CT")
//             printer.text("Cant-Prod-Prec")
//             printer.text("----------")
//             printer.align("LT")

//             let total = 0;
//             for(let i = 0; i < comanda_drinks.length; i++) {
//               const curr_comanda = comanda_drinks[i];
//               const curr_subtotal = ((parseFloat(curr_comanda["subtotal_modificado"]) != 0) ? curr_comanda["subtotal_modificado"] : curr_comanda["subtotal"]);
//               total += parseFloat(curr_subtotal);

//               printer.text(
//                 curr_comanda["cantidad"] + ".- " + curr_comanda["producto"]["producto"] + " $" + curr_subtotal + " ($" + curr_comanda["precio"] + " c/u)"
//               )
//               printer.feed(1)
//             }
//             total = total.toFixed(2);

//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("LT")
//             .tableCustom(
//               [
//                 { text: "Subtotal:", align: "LEFT", width: 0.33 },
//                 { text: "$" + total, align: "RIGHT", width: 0.33 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Impuestos:", align: "LEFT", width: 0.33 },
//                 { text: "$0.00", align: "RIGHT", width: 0.33 }
//               ]
//             )
//             printer.feed(1)
//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("LT")
//             .tableCustom(
//               [
//                 { text: "Metodo pago:", align: "LEFT", width: 0.33 },
//                 {
//                   text: parseInt(data["metodo_pago"] == 1) ? "Efectivo" : parseInt(data["metodo_pago"] == 2) ? "T. de Credito" :  parseInt(data["metodo_pago"]) == 3 ? "T. de Debito" : "Efectivo",
//                   align: "RIGHT",
//                   width: 0.33
//                 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Total pagado:", align: "LEFT", width: 0.33 },
//                 { text: "$" + total, align: "RIGHT", width: 0.33 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Cambio:", align: "LEFT", width: 0.33 },
//                 { text: "$0.00", align: "RIGHT", width: 0.33 }
//               ]
//             )
//             printer.feed(1)
//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.text("GRACIAS POR SU")
//             printer.text("COMPRA")
//             printer.feed(1)
//             printer.drawLine()
//             printer.cut()
//             printer.close()
//           });
//       });
//     });
//   }
// });

// ipcMain.on("printer-order", async function(e, data) {
//   let image_path = "";
//   if(isDevelopment) {
//     image_path = path.join(__dirname, "src/assets/img/vue-typescript-full-sample-logo-ticket.png");
//   } else {
//     let rootDir = app.getAppPath();
//     let last = path.basename(rootDir);
//     if(last == "app.asar")
//         rootDir = path.dirname(app.getPath("exe"))
//     image_path = path.join(rootDir, "resources/img/vue-typescript-full-sample-logo-ticket.png");
//   }

//   // Format date properly
//   let fecha_final = data["fecha_final"];
//   let splitted_fecha_final = fecha_final.split("-");
//   let fecha_result = fecha_final;
//   if(splitted_fecha_final.length == 3) {
//     let year = splitted_fecha_final[0];
//     let month = splitted_fecha_final[1];
//     let day = splitted_fecha_final[2];
//     fecha_result = day + "/" + month + "/" + year;
//   }

//   // Split comanda data by category
//   let comanda_products = [];
//   let comanda_drinks = [];
//   for(let i = 0; i < data["comanda"].length; i++) {
//       const curr_comanda = data["comanda"][i];
//       const curr_producto = curr_comanda["producto"];
//       const curr_categoria = curr_producto["categoria"];
//       if(curr_categoria["lugar"] == "c")
//         comanda_products.push(curr_comanda);
//       else if(curr_categoria["lugar"] == "b")
//         comanda_drinks.push(curr_comanda);
//   }

//   if(comanda_products.length > 0) {
//     const device  = new escpos.USB(); // 0x0416, 0x5011
//     const options = { encoding: "utf8" }
//     const printer = new escpos.Printer(device, options);

//     escpos.Image.load(image_path, function(image) {
//       device.open(function() {
//         printer.size(1, 1)
//         printer.align("CT")
//         printer.image(image, "s8")
//           .then(() => {
//             printer.size(0.5, 0.5)
//             printer.feed(1)
//             printer.text("Fecha")
//             printer.text(fecha_result)
//             printer.text(data["hora_final"]);
//             printer.feed(1)
//             printer.text("GUERRERO 25")
//             printer.text("CENTRO 47980");
//             printer.text("DEGOLLADO")
//             printer.text("JALISCO");
//             printer.feed(1)
//             printer.text("Mesero")
//             printer.text(data["mesero"]["nombre"] + " " + data["mesero"]["apellidos"])
//             printer.feed(1)
//             printer.text("Id del pedido")
//             printer.text("#" + data["idpedido"])
//             printer.feed(1)
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("CT")
//             printer.text("Cant-Prod-Prec")
//             printer.text("----------")
//             printer.align("LT")

//             let total = 0;
//             for(let i = 0; i < comanda_products.length; i++) {
//               const curr_comanda = comanda_products[i];
//               const curr_subtotal = ((parseFloat(curr_comanda["subtotal_modificado"]) != 0) ? curr_comanda["subtotal_modificado"] : curr_comanda["subtotal"]);
//               total += parseFloat(curr_subtotal);

//               printer.text(
//                 curr_comanda["cantidad"] + ".- " + curr_comanda["producto"]["producto"] + " $" + curr_subtotal + " ($" + curr_comanda["precio"] + " c/u)"
//               )
//               printer.feed(1)
//             }
//             total = total.toFixed(2);

//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("LT")
//             .tableCustom(
//               [
//                 { text: "Subtotal:", align: "LEFT", width: 0.33 },
//                 { text: "$" + total, align: "RIGHT", width: 0.33 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Impuestos:", align: "LEFT", width: 0.33 },
//                 { text: "$0.00", align: "RIGHT", width: 0.33 }
//               ]
//             )
//             printer.feed(1)
//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("LT")
//             .tableCustom(
//               [
//                 { text: "Metodo pago:", align: "LEFT", width: 0.33 },
//                 {
//                   text: parseInt(data["metodo_pago"] == 1) ? "Efectivo" : parseInt(data["metodo_pago"] == 2) ? "T. de Credito" :  parseInt(data["metodo_pago"]) == 3 ? "T. de Debito" : "Efectivo",
//                   align: "RIGHT",
//                   width: 0.33
//                 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Total pagado:", align: "LEFT", width: 0.33 },
//                 { text: "$" + total, align: "RIGHT", width: 0.33 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Cambio:", align: "LEFT", width: 0.33 },
//                 { text: "$0.00", align: "RIGHT", width: 0.33 }
//               ]
//             )
//             printer.feed(1)
//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.text("GRACIAS POR SU")
//             printer.text("COMPRA")
//             printer.feed(1)
//             printer.drawLine()
//             printer.cut()
//             printer.close()
//           });
//       });
//     });
//   }

//   if(comanda_drinks.length > 0) {
//     const device  = new escpos.USB(); // 0x0416, 0x5011
//     const options = { encoding: "utf8" }
//     const printer = new escpos.Printer(device, options);

//     escpos.Image.load(image_path, function(image) {
//       device.open(function() {
//         printer.size(1, 1)
//         printer.align("CT")
//         printer.image(image, "s8")
//           .then(() => {
//             printer.size(0.5, 0.5)
//             printer.feed(1)
//             printer.text("Fecha")
//             printer.text(fecha_result)
//             printer.text(data["hora_final"]);
//             printer.feed(1)
//             printer.text("GUERRERO 25")
//             printer.text("CENTRO 47980");
//             printer.text("DEGOLLADO")
//             printer.text("JALISCO");
//             printer.feed(1)
//             printer.text("Mesero")
//             printer.text(data["mesero"]["nombre"] + " " + data["mesero"]["apellidos"])
//             printer.feed(1)
//             printer.text("Id del pedido")
//             printer.text("#" + data["idpedido"])
//             printer.feed(1)
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("CT")
//             printer.text("Cant-Prod-Prec")
//             printer.text("----------")
//             printer.align("LT")

//             let total = 0;
//             for(let i = 0; i < comanda_drinks.length; i++) {
//               const curr_comanda = comanda_drinks[i];
//               const curr_subtotal = ((parseFloat(curr_comanda["subtotal_modificado"]) != 0) ? curr_comanda["subtotal_modificado"] : curr_comanda["subtotal"]);
//               total += parseFloat(curr_subtotal);

//               printer.text(
//                 curr_comanda["cantidad"] + ".- " + curr_comanda["producto"]["producto"] + " $" + curr_subtotal + " ($" + curr_comanda["precio"] + " c/u)"
//               )
//               printer.feed(1)
//             }
//             total = total.toFixed(2);

//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("LT")
//             .tableCustom(
//               [
//                 { text: "Subtotal:", align: "LEFT", width: 0.33 },
//                 { text: "$" + total, align: "RIGHT", width: 0.33 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Impuestos:", align: "LEFT", width: 0.33 },
//                 { text: "$0.00", align: "RIGHT", width: 0.33 }
//               ]
//             )
//             printer.feed(1)
//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.align("LT")
//             .tableCustom(
//               [
//                 { text: "Metodo pago:", align: "LEFT", width: 0.33 },
//                 {
//                   text: parseInt(data["metodo_pago"] == 1) ? "Efectivo" : parseInt(data["metodo_pago"] == 2) ? "T. de Credito" :  parseInt(data["metodo_pago"]) == 3 ? "T. de Debito" : "Efectivo",
//                   align: "RIGHT",
//                   width: 0.33
//                 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Total pagado:", align: "LEFT", width: 0.33 },
//                 { text: "$" + total, align: "RIGHT", width: 0.33 }
//               ]
//             )
//             .tableCustom(
//               [
//                 { text: "Cambio:", align: "LEFT", width: 0.33 },
//                 { text: "$0.00", align: "RIGHT", width: 0.33 }
//               ]
//             )
//             printer.feed(1)
//             printer.align("CT")
//             printer.drawLine()
//             printer.feed(1)
//             printer.text("GRACIAS POR SU")
//             printer.text("COMPRA")
//             printer.feed(1)
//             printer.drawLine()
//             printer.cut()
//             printer.close()
//           });
//       });
//     });
//   }
// });
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
