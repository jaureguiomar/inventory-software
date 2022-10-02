import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
   "api", {
      send: (channel:string, data) => {
         const validChannels:Array<string> = [
            "client-module-window", "supplier-module-window",
            "product-module-window", "category-module-window",
            "user-module-window"
         ];
         if(validChannels.includes(channel))
            ipcRenderer.send(channel, data);
      },
      receive: (channel:string, func) => {
         const validChannels:Array<string> = [
            "main-window-client-module-reply", "main-window-supplier-module-reply",
            "main-window-product-module-reply", "main-window-category-module-reply",
            "main-window-user-module-reply"
         ];
         if(validChannels.includes(channel))
            ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
   }
);
