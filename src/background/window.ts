import { BrowserWindow, dialog, ipcMain } from "electron";
import path from "path";

const app_port = getAppPort();
export const window = {
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
   },
   user_role: {
      add: null as any,
      update: null as any,
      delete: null as any,
      see: null as any
   },
   sale_product: {
      // add: null as any,
      // update: null as any,
      // delete: null as any,
      see: null as any
   },
   cash_cutoff: {
      // add: null as any,
      // update: null as any,
      // delete: null as any,
      see: null as any
   },
   activity_log: {
      // add: null as any,
      // update: null as any,
      // delete: null as any,
      see: null as any
   }
};

////////////
// Client //
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
      window.client[data.type].removeMenu();
      window.client[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/client/add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/client/update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/client/delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/client/see/${ data.id }`;

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

//////////////
// Supplier //
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
      window.supplier[data.type].removeMenu();
      window.supplier[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/supplier/add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/supplier/update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/supplier/delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/supplier/see/${ data.id }`;

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

/////////////
// Product //
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
      window.product[data.type].removeMenu();
      window.product[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/product/add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/product/update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/product/delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/product/see/${ data.id }`;

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

//////////////
// Category //
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
      window.category[data.type].removeMenu();
      window.category[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/category/add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/category/update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/category/delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/category/see/${ data.id }`;

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

//////////
// User //
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
      window.user[data.type].removeMenu();
      window.user[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/user/add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/user/update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/user/delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/user/see/${ data.id }`;

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

///////////////
// User Role //
ipcMain.on("user-role-module-window", function(e, data) {
   if(!window.user_role[data.type] || window.user_role[data.type].isDestroyed()) {
      window.user_role[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadUserRole.js")
         }
      });
      window.user_role[data.type].removeMenu();
      window.user_role[data.type].maximize();

      let setURL = "";
      if(data.type === "add")
         setURL = buildAppRoute() + "/user-role/add";
      else if(data.type === "update")
         setURL = buildAppRoute() + `/user-role/update/${ data.id }`;
      else if(data.type === "delete")
         setURL = buildAppRoute() + `/user-role/delete/${ data.id }`;
      else if(data.type === "see")
         setURL = buildAppRoute() + `/user-role/see/${ data.id }`;

      window.user_role[data.type].loadURL(setURL);
      window.user_role[data.type].show();
      if(!process.env.IS_TEST)
         window.user_role[data.type].webContents.openDevTools();

      window.user_role[data.type].webContents.once("did-finish-load", function () {
         window.user_role[data.type].webContents.send("user-role-module-window-reply", data);
      });
      window.user_role[data.type].once("close", function () {
         window.user_role[data.type].destroy();
         window.user_role[data.type] = null;
      });
   } else {
      window.user_role[data.type].focus();
   }
});
ipcMain.on("user-role-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.user_role[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("user-role-module-window-dialog-reply");
   });
});
ipcMain.on("user-role-module-window-close", function(e, data) {
   window.user_role[data.type].destroy();
   window.user_role[data.type] = null;
   window.main.webContents.send("main-window-user-role-module-reply", data);
});

//////////////////
// Sale Product //
ipcMain.on("sale-product-module-window", function(e, data) {
   if(!window.sale_product[data.type] || window.sale_product[data.type].isDestroyed()) {
      window.sale_product[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadSaleProduct.js")
         }
      });
      window.sale_product[data.type].removeMenu();
      window.sale_product[data.type].maximize();

      let setURL = "";
      // if(data.type === "add")
      //    setURL = buildAppRoute() + "/sale-product/add";
      // else if(data.type === "update")
      //    setURL = buildAppRoute() + `/sale-product/update/${ data.id }`;
      // else if(data.type === "delete")
      //    setURL = buildAppRoute() + `/sale-product/delete/${ data.id }`;
      if(data.type === "see")
         setURL = buildAppRoute() + `/sale-product/see/${ data.id }`;

      window.sale_product[data.type].loadURL(setURL);
      window.sale_product[data.type].show();
      if(!process.env.IS_TEST)
         window.sale_product[data.type].webContents.openDevTools();

      window.sale_product[data.type].webContents.once("did-finish-load", function () {
         window.sale_product[data.type].webContents.send("sale-product-module-window-reply", data);
      });
      window.sale_product[data.type].once("close", function () {
         window.sale_product[data.type].destroy();
         window.sale_product[data.type] = null;
      });
   } else {
      window.sale_product[data.type].focus();
   }
});
ipcMain.on("sale-product-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.sale_product[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("sale-product-module-window-dialog-reply");
   });
});
ipcMain.on("sale-product-module-window-close", function(e, data) {
   window.sale_product[data.type].destroy();
   window.sale_product[data.type] = null;
   window.main.webContents.send("main-window-sale-product-module-reply", data);
});

/////////////////
// Cash Cutoff //
ipcMain.on("cash-cutoff-module-window", function(e, data) {
   if(!window.cash_cutoff[data.type] || window.cash_cutoff[data.type].isDestroyed()) {
      window.cash_cutoff[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadCashCutoff.js")
         }
      });
      window.cash_cutoff[data.type].removeMenu();
      window.cash_cutoff[data.type].maximize();

      let setURL = "";
      // if(data.type === "add")
      //    setURL = buildAppRoute() + "/cash-cutoff/add";
      // else if(data.type === "update")
      //    setURL = buildAppRoute() + `/cash-cutoff/update/${ data.id }`;
      // else if(data.type === "delete")
      //    setURL = buildAppRoute() + `/cash-cutoff/delete/${ data.id }`;
      if(data.type === "see")
         setURL = buildAppRoute() + `/cash-cutoff/see/${ data.id }`;

      window.cash_cutoff[data.type].loadURL(setURL);
      window.cash_cutoff[data.type].show();
      if(!process.env.IS_TEST)
         window.cash_cutoff[data.type].webContents.openDevTools();

      window.cash_cutoff[data.type].webContents.once("did-finish-load", function () {
         window.cash_cutoff[data.type].webContents.send("cash-cutoff-module-window-reply", data);
      });
      window.cash_cutoff[data.type].once("close", function () {
         window.cash_cutoff[data.type].destroy();
         window.cash_cutoff[data.type] = null;
      });
   } else {
      window.cash_cutoff[data.type].focus();
   }
});
ipcMain.on("cash-cutoff-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.cash_cutoff[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("cash-cutoff-module-window-dialog-reply");
   });
});
ipcMain.on("cash-cutoff-module-window-close", function(e, data) {
   window.cash_cutoff[data.type].destroy();
   window.cash_cutoff[data.type] = null;
   window.main.webContents.send("main-window-cash-cutoff-module-reply", data);
});

//////////////////
// Activity Log //
ipcMain.on("activity-log-module-window", function(e, data) {
   if(!window.activity_log[data.type] || window.activity_log[data.type].isDestroyed()) {
      window.activity_log[data.type] = new BrowserWindow({
         width: 1024,
         height: 768,
         // fullscreen: true,
         // icon: icon_path,
         webPreferences: {
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, "preloadActivityLog.js")
         }
      });
      window.activity_log[data.type].removeMenu();
      window.activity_log[data.type].maximize();

      let setURL = "";
      // if(data.type === "add")
      //    setURL = buildAppRoute() + "/activity-log/add";
      // else if(data.type === "update")
      //    setURL = buildAppRoute() + `/activity-log/update/${ data.id }`;
      // else if(data.type === "delete")
      //    setURL = buildAppRoute() + `/activity-log/delete/${ data.id }`;
      if(data.type === "see")
         setURL = buildAppRoute() + `/activity-log/see/${ data.id }`;

      window.activity_log[data.type].loadURL(setURL);
      window.activity_log[data.type].show();
      if(!process.env.IS_TEST)
         window.activity_log[data.type].webContents.openDevTools();

      window.activity_log[data.type].webContents.once("did-finish-load", function () {
         window.activity_log[data.type].webContents.send("activity-log-module-window-reply", data);
      });
      window.activity_log[data.type].once("close", function () {
         window.activity_log[data.type].destroy();
         window.activity_log[data.type] = null;
      });
   } else {
      window.activity_log[data.type].focus();
   }
});
ipcMain.on("activity-log-module-window-dialog", function(e, data) {
   dialog.showMessageBox(window.activity_log[data.type], {
      title: "System message",
      buttons: ["Ok"],
      type: "info",
      message: data.message,
   }).then(() => {
      e.sender.send("activity-log-module-window-dialog-reply");
   });
});
ipcMain.on("activity-log-module-window-close", function(e, data) {
   window.activity_log[data.type].destroy();
   window.activity_log[data.type] = null;
   window.main.webContents.send("main-window-activity-log-module-reply", data);
});

///////////////
// Functions //
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
