import crossIcon from "@/assets/icons/cross-icon.png";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GlassView } from "expo-glass-effect";
import { useCallback, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
};

const Sheet: React.FC<Props> = ({ isOpen, title, onClose, children }) => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["90%"];

  const close = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <BottomSheet
      ref={sheetRef}
      index={isOpen ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing={false}
      backgroundStyle={s.sheetBg}
      handleIndicatorStyle={s.handle}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
        />
      )}
      onClose={onClose}
    >
      <BottomSheetView style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={close} style={s.iconBtnLeft}>
            <GlassView pointerEvents="none" style={s.glassView} />
            <Image source={crossIcon} alt="cross icon" style={s.iconImg} />
          </TouchableOpacity>
          <Text style={s.title}>{title}</Text>
          <View style={s.iconBtn} />
        </View>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

const s = StyleSheet.create({
  sheetBg: { backgroundColor: "#141414", borderRadius: 50 },
  handle: { backgroundColor: "#555", width: 36 },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  iconBtnLeft: {
    width: 44,
    height: 44,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  glassView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  iconBtn: {
    width: 40,
    height: 40,
  },
  iconImg: { width: 14, height: 14 },
  title: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

export default Sheet;
