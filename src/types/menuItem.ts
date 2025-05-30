export interface MenuItem {
  MENU_ID: number;
  MENU_DESCRIPTION: string;
  NAVLINK: string;
  icon: string;
  children?: MenuItem[];
  EDITABLE?: number;
  module_id?: number;
}
