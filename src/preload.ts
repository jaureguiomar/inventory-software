import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
   "api", {
      send: (channel:string, data) => {
         const validChannels:Array<string> = ["client-module-window"];
         if(validChannels.includes(channel))
            ipcRenderer.send(channel, data);
      },
      receive: (channel:string, func) => {
         const validChannels:Array<string> = ["main-window-client-module-reply"];
         if(validChannels.includes(channel))
            ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
   }
);
