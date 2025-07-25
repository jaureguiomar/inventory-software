import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
   "api", {
      send: (channel:string, data:any) => {
         const validChannels:Array<string> = [
            "mysql-offline-bakup", "mysql-get-unsync-data",
            "mysql-sync-unsync-data", "mysql-get-category",

            "client-module-window", "supplier-module-window",
            "product-module-window", "category-module-window",
            "user-module-window", "user-role-module-window",
            "sale-product-module-window", "cash-cutoff-module-window",
            "activity-log-module-window", "print-sale"
         ];
         if(validChannels.includes(channel))
            ipcRenderer.send(channel, data);
      },
      receive: (channel:string, func:any) => {
         const validChannels:Array<string> = [
            "setup-machine",
            "mysql-offline-bakup-reply", "mysql-get-unsync-data-reply",
            "mysql-sync-unsync-data-reply", "mysql-get-category-reply",

            "main-window-client-module-reply", "main-window-supplier-module-reply",
            "main-window-product-module-reply", "main-window-category-module-reply",
            "main-window-user-module-reply", "main-window-user-role-module-reply",
            "main-window-sale-product-module-reply", "main-window-cash-cutoff-module-reply",
            "main-window-activity-log-module-reply"
         ];
         if(validChannels.includes(channel))
            ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
   }
);
