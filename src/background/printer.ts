import { ipcMain } from "electron";
import escpos from "escpos";
escpos.USB = require("escpos-usb");

/////////////
// Printer //
ipcMain.on("print-sale", async function(e, data) {
   const device  = new escpos.USB();
   const options = { encoding: "utf8" }
   const printer = new escpos.Printer(device, options);

   device.open(function() {
      printer.size(0, 0);
      printer.align("CT");
      printer.text("Fecha");
      printer.text("20 de Agosto del 2022 13:22:22");
      printer.feed();
      printer.text("GUERRERO 25 CENTRO 47980");
      printer.text("DEGOLLADO JALISCO");
      // printer.feed();
      printer.text("Mesero");
      printer.text("Omar Misael Torres Jauregui");
      // printer.feed();
      printer.text("Id de venta");
      printer.text("#111");
      // printer.feed();
      printer.text("Mesa");
      printer.text("Cocina #1");
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.align("CT");
      printer.text("Cantidad - Producto - Total");
      printer.text("------------------------------");
      printer.align("LT");

      // let total = 0;
      // for(let i = 0; i < data["comanda"].length; i++) {
      //    const curr_comanda = data["comanda"][i];
      //    const curr_subtotal = ((parseFloat(curr_comanda["subtotal_modificado"]) != 0) ? curr_comanda["subtotal_modificado"] : curr_comanda["subtotal"]);
      //    total += parseFloat(curr_subtotal);

      //    printer.text(
      //    curr_comanda["cantidad"] + ".-" + curr_comanda["producto"]["producto"] + " $" + curr_subtotal
      //    // curr_comanda["cantidad"] + ".- " + curr_comanda["producto"]["producto"] + " $" + curr_subtotal + " ($" + curr_comanda["precio"] + " c/u)"
      //    );
      //    // if(i < (data["comanda"].length - 1))
      //    //   printer.feed();
      // }

      printer.align("CT")
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.align("LT")
      printer.tableCustom(
         [
            { text: "Subtotal:", align: "LEFT", width: 0.33 },
            { text: "$1,200.00", align: "RIGHT", width: 0.33 }
         ]
      );
      printer.tableCustom(
         [
            { text: "Impuestos:", align: "LEFT", width: 0.33 },
            { text: "$0.00", align: "RIGHT", width: 0.33 }
         ]
      );
      printer.align("CT");
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.align("LT");
      printer.tableCustom(
         [
            { text: "Metodo pago:", align: "LEFT", width: 0.33 },
            { text: "Efectivo", align: "RIGHT", width: 0.33 }
         ]
      );
      printer.tableCustom(
         [
            { text: "Total pagado:", align: "LEFT", width: 0.33 },
            { text: "$1,500.00", align: "RIGHT", width: 0.33 }
         ]
      );
      printer.tableCustom(
         [
            { text: "Cambio:", align: "LEFT", width: 0.33 },
            { text: "$10.00", align: "RIGHT", width: 0.33 }
         ]
      );
      printer.align("CT");
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.text("GRACIAS POR SU");
      printer.text("COMPRA");
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.feed();
      printer.feed();
      printer.cut();
      printer.close();
   });
});
