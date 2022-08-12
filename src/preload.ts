import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
   "api", {
      send: (channel:string, data) => {
         const validChannels:Array<string> = ["client-add-update-window"];
         if(validChannels.includes(channel))
            ipcRenderer.send(channel, data);
      },
      receive: (channel:string, func) => {
         const validChannels:Array<string> = [];
         if(validChannels.includes(channel))
            ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
   }
);
