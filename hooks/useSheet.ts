import useSheets, { SheetName } from "@/stores/sheets";

export const useSheet = () => {
  const activeSheet = useSheets((state) => state.activeSheet);
  const openSheet = useSheets((state) => state.openSheet);
  const closeSheet = useSheets((state) => state.closeSheet);

  const isSheetOpen = (sheetName: SheetName) => activeSheet === sheetName;

  return {
    activeSheet,
    openSheet,
    closeSheet,
    isSheetOpen,
  };
};
