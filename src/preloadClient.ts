import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
   "api", {
      send: (channel:string, data) => {
         const validChannels:Array<string> = ["client-module-window-dialog", "client-module-window-close"];
         if(validChannels.includes(channel))
            ipcRenderer.send(channel, data);
      },
      receive: (channel:string, func) => {
         const validChannels:Array<string> = ["client-module-window-dialog-reply", "client-module-window-reply"];
         if(validChannels.includes(channel))
            ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
   }
);
