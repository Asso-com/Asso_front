import type { MenuItem, ModuleItem } from '@/types/menuItem';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface MenuState {
    menuData: MenuItem[];
    filterKey: string;
    modulesList: ModuleItem[];
    menuDataFilter: MenuItem[];
    currentModule: string;
    accessRoutes: string[];
}

const initialState: MenuState = {
    menuData: [],
    filterKey: '',
    modulesList: [],
    menuDataFilter: [],
    currentModule: '',
    accessRoutes: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setModulesList(state, action: PayloadAction<ModuleItem[]>) {
            state.modulesList = action.payload;
        },

        updateMenuData(state, action: PayloadAction<MenuItem[]>) {
            state.menuData = action.payload;
        },

        setAccessRoutes(state, action: PayloadAction<string[]>) {
            state.accessRoutes = action.payload;
        },

        setFilterData(state, action: PayloadAction<string>) {
            const selectedModule = action.payload;
            state.currentModule = selectedModule;
            state.filterKey = selectedModule;

            if (selectedModule === 'ALL') {
                state.menuDataFilter = state.menuData;
            } else {
                state.menuDataFilter = state.menuData.filter(
                    (menuItem) =>
                        // menuItem.MENU_PARENTID === -1 &&
                        menuItem.children &&
                        menuItem.MODULE_CODE === selectedModule
                );
            }
        },

        resetMenuSlice(state) {
            state.menuData = [];
            state.filterKey = '';
            state.modulesList = [];
            state.menuDataFilter = [];
            state.accessRoutes = [];
            state.currentModule = '';
        },
    },
});

export const {
    updateMenuData,
    setFilterData,
    setModulesList,
    resetMenuSlice,
    setAccessRoutes,
} = menuSlice.actions;

export default menuSlice.reducer;
