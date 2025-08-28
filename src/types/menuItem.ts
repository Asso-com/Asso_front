export interface ModuleItem {
  id: number;
  module_code: string;
  module_name: string;
  module_icon: string
}

export interface MenuItem {
  menu_id: number;
  menu_description: string;
  navLink: string;
  icon: string;
  children?: MenuItem[];
  EDITABLE?: number;
  module_code?: string;
  MENU_PARENTID?: number;
}