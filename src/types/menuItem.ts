export interface ModuleItem {
  ID: number;
  MODULE: string;
  MENU_DESCRIPTION: string;
}

export interface MenuItem {
  MENU_ID: number;
  MENU_DESCRIPTION: string;
  NAVLINK: string;
  icon: string;
  children?: MenuItem[];
  EDITABLE?: number;
  MODULE_CODE?: string;
  MENU_PARENTID?: number;
}