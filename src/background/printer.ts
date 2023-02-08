import { ipcMain } from "electron";
import escpos from "escpos";
import { getFormattedDateString } from "@/plugins/mixins/general";

escpos.USB = require("escpos-usb");

ipcMain.on("print-sale", async function(e, data) {
   const device  = new escpos.USB();
   const options = { encoding: "utf8" };
   const printer = new escpos.Printer(device, options);

   device.open(function() {
      printer.size(0, 0);
      printer.align("CT");
      printer.text(data.sale.branch.name);
      printer.text("POS");
      printer.text(data.sale.pos.name);
      printer.text("Date");
      printer.text(getFormattedDateString(data.sale.created, 0, 0, true));
      printer.feed();
      printer.text(data.sale.branch.address);
      printer.text("Telephone");
      printer.text(data.sale.branch.telephone);
      // printer.feed();
      printer.text("Cashier");
      printer.text(data.sale.user.first_name + " " + data.sale.user.last_name);
      // printer.feed();
      printer.text("ID Sale");
      printer.text(`#${ data.sale.id }`);
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.align("CT");
      printer.text("Quantity - Product - Total");
      printer.text("------------------------------");
      printer.align("LT");

      let total = 0;
      for(let i = 0; i < data.sale_product_m2m.product.length; i++) {
         const curr_product = data.sale_product_m2m.product[i];
         total += parseFloat(curr_product.sale_price);

         printer.text(
            curr_product.quantity + ".-" + curr_product.name + " $" + curr_product.sale_price
            // curr_product.quantity + ".- " + curr_product.name + " $" + curr_product.sale_price + " ($" + curr_product.sale_price + " c/u)"
         );
         if(i < (curr_product.length - 1))
           printer.feed();
      }

      // printer.align("CT")
      // printer.text("------------------------------");
      // printer.text("------------------------------");
      // printer.align("LT")
      // printer.tableCustom(
      //    [
      //       { text: "Subtotal:", align: "LEFT", width: 0.33 },
      //       { text: "$1,200.00", align: "RIGHT", width: 0.33 }
      //    ]
      // );
      // printer.tableCustom(
      //    [
      //       { text: "Taxes:", align: "LEFT", width: 0.33 },
      //       { text: "$0.00", align: "RIGHT", width: 0.33 }
      //    ]
      // );
      printer.align("CT");
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.align("LT");
      printer.tableCustom(
         [
            { text: "Payment Method:", align: "LEFT", width: 0.33 },
            { text: "Efectivo", align: "RIGHT", width: 0.33 }
         ]
      );
      printer.tableCustom(
         [
            { text: "Total paid:", align: "LEFT", width: 0.33 },
            { text: `$${ total }`, align: "RIGHT", width: 0.33 }
         ]
      );
      // printer.tableCustom(
      //    [
      //       { text: "Change:", align: "LEFT", width: 0.33 },
      //       { text: "$10.00", align: "RIGHT", width: 0.33 }
      //    ]
      // );
      printer.align("CT");
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.text("THANK YOU");
      printer.text("------------------------------");
      printer.text("------------------------------");
      printer.feed();
      printer.feed();
      printer.cut();
      printer.close();
   });
});
