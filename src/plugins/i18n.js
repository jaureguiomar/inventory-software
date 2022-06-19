import Vue from "vue";
import VueI18n from "vue-i18n";

const messages = {
   en: {
      navbar: {
      home: "Home",
      products: "Products",
      specials: "Specials",
      myAccount: "My Account",
      signUp: "Sign Up",
      shipping: "Shipping",
      contactUs: "Contact Us",
      },
   },
   es: {
      navbar: {
      home: "Inicio",
      products: "Productos",
      specials: "Especiales",
      myAccount: "Mi Cuenta",
      signUp: "Iniciar Sesion",
      shipping: "Envios",
      contactUs: "Contactanos",
      }
   }
};

Vue.use(VueI18n);
const i18n = new VueI18n({
   messages,
   locale: "en",
});

export default i18n;
