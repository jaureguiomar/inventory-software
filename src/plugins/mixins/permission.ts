import { UserRolePermission, UserRolePermissionAttributes } from "@/types/user-role-permission";

export const validate_permission = (user_permissions:number, attr_value:string) => {
   const attr_value_parsed:number = parseInt(attr_value, 16);
   if((user_permissions & attr_value_parsed) == attr_value_parsed)
      return true;
   else
      return false;
}

export const format_user_permissions = (all_permissions:Array<UserRolePermission>, user_permissions:UserRolePermissionAttributes) => {
   const result_data = {
      names: [],
      descriptions: [],
      attr_values: [],
      attr_levels: [],
      ints: [],
      access: []
   };
   const names = [];
   const descriptions = [];
   const attr_values = [];
   const attr_levels = [];
   const ints = [];
   const access = [];

   for(let i = 0; i < all_permissions.length; i++) {
      names[all_permissions[i].shortname] = all_permissions[i].name;
      descriptions[all_permissions[i].shortname] = all_permissions[i].description;
      attr_values[all_permissions[i].shortname] = all_permissions[i].attr_value;
      attr_levels[all_permissions[i].shortname] = all_permissions[i].attr_level;
      ints[all_permissions[i].shortname] = parseInt(all_permissions[i].attr_value, 16);
      access[all_permissions[i].shortname] = false;
   }

   const atributes_1 = user_permissions["atributes_1"];
   const atributes_2 = user_permissions["atributes_2"];
   const atributes_3 = user_permissions["atributes_3"];
   const atributes_4 = user_permissions["atributes_4"];
   const access_keys = Object.keys(access);
   for(let i = 0; i < access_keys.length; i++) {
      if(attr_levels[access_keys[i]] === 1) {
         if(validate_permission(atributes_1, attr_values[access_keys[i]]))
            access[access_keys[i]] = true;
      } else if(attr_levels[access_keys[i]] === 2) {
         if(validate_permission(atributes_2, attr_values[access_keys[i]]))
            access[access_keys[i]] = true;
      } else if(attr_levels[access_keys[i]] === 3) {
         if(validate_permission(atributes_3, attr_values[access_keys[i]]))
            access[access_keys[i]] = true;
      } else if(attr_levels[access_keys[i]] === 4) {
         if(validate_permission(atributes_4, attr_values[access_keys[i]]))
            access[access_keys[i]] = true;
      }
   }

   result_data.names = names;
   result_data.descriptions = descriptions;
   result_data.attr_values = attr_values;
   result_data.attr_levels = attr_levels;
   result_data.ints = ints;
   result_data.access = access;
   return result_data;
};
