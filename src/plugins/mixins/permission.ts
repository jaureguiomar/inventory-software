import { UserRolePermission, UserRolePermissionAttributes } from "@/interfaces/user-role-permission/user-role-permission";

export const validate_permission = (user_permissions:number, attr_value:string) => {
   const attr_value_parsed:number = parseInt(attr_value, 16)
   if((user_permissions & attr_value_parsed) == attr_value_parsed)
      return true;
   else
      return false;
}

export const format_user_permissions = (all_permissions:Array<UserRolePermission>, user_permissions:UserRolePermissionAttributes) => {
   const result_data = {
      names: [],
      descriptions: [],
      attrs: [],
      ints: [],
      access: []
   };
   const names = [];
   const descriptions = [];
   const attrs = [];
   const ints = [];
   const access = [];

   for(let i = 0; i < all_permissions.length; i++) {
      names[all_permissions[i].shortname] = all_permissions[i].name;
      descriptions[all_permissions[i].shortname] = all_permissions[i].description;
      attrs[all_permissions[i].shortname] = all_permissions[i].attr_value;
      ints[all_permissions[i].shortname] = parseInt(all_permissions[i].attr_value, 16);
      access[all_permissions[i].shortname] = false;
   }

   const atributes = user_permissions["atributes_1"];
   const access_keys = Object.keys(access);
   for(let i = 0; i < access_keys.length; i++) {
      if(validate_permission(atributes, attrs[access_keys[i]]))
         access[access_keys[i]] = true;
   }

   result_data.names = names;
   result_data.descriptions = descriptions;
   result_data.attrs = attrs;
   result_data.ints = ints;
   result_data.access = access;
   return result_data;
};
