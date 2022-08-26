import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
   "api", {
      send: (channel:string, data) => {
         const validChannels:Array<string> = ["category-module-window-dialog", "category-module-window-close"];
         if(validChannels.includes(channel))
            ipcRenderer.send(channel, data);
      },
      receive: (channel:string, func) => {
         const validChannels:Array<string> = ["category-module-window-dialog-reply", "category-module-window-reply"];
         if(validChannels.includes(channel))
            ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
   }
);
