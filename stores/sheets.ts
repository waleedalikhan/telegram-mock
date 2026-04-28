import { create } from "zustand";

export type SheetName = "nodes" | "newNode";

interface SheetsStore {
  activeSheet: SheetName | null;
  openSheet: (sheetName: SheetName) => void;
  closeSheet: () => void;
}

const useSheets = create<SheetsStore>((set) => ({
  activeSheet: null,
  openSheet: (sheetName) => set({ activeSheet: sheetName }),
  closeSheet: () => set({ activeSheet: null }),
}));

export default useSheets;
