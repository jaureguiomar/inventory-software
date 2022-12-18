import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
   "api", {
      send: (channel:string, data:any) => {
         const validChannels:Array<string> = ["cash-cutoff-module-window-dialog", "cash-cutoff-module-window-close"];
         if(validChannels.includes(channel))
            ipcRenderer.send(channel, data);
      },
      receive: (channel:string, func:any) => {
         const validChannels:Array<string> = ["cash-cutoff-module-window-dialog-reply", "cash-cutoff-module-window-reply"];
         if(validChannels.includes(channel))
            ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
   }
);
