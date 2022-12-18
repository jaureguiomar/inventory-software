import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
   "api", {
      send: (channel:string, data:any) => {
         const validChannels:Array<string> = [
            "category-module-window-dialog", "category-module-window-close",

            "mysql-create-category", "mysql-update-category",
            "mysql-delete-category",
         ];
         if(validChannels.includes(channel))
            ipcRenderer.send(channel, data);
      },
      receive: (channel:string, func:any) => {
         const validChannels:Array<string> = [
            "category-module-window-dialog-reply", "category-module-window-reply",

            "mysql-create-category-reply", "mysql-update-category-reply",
            "mysql-delete-category-reply",
         ];
         if(validChannels.includes(channel))
            ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
   }
);
