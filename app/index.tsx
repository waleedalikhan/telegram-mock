import SheetsHost from "@/components/bottom-sheets/SheetsHost";
import Home from "@/components/Home";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <SafeAreaView
        style={{
          padding: 16,
          flex: 1,
        }}
        edges={["top"]}
      >
        <Home />
      </SafeAreaView>
      <SheetsHost />
    </>
  );
}
