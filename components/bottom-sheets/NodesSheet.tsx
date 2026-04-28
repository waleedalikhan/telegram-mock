import Sheet from "@/components/bottom-sheets/Sheet";
import NodeBar from "@/components/NodeBar";
import { useSheet } from "@/hooks/useSheet";
import type { Node } from "@/stores/nodes";
import useNodes from "@/stores/nodes";
import { GlassView } from "expo-glass-effect";
import { useRef } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

const NodesSheet: React.FC = () => {
  const { closeSheet, isSheetOpen } = useSheet();
  const nodes = useNodes((state) => state.nodes);
  const selectedNode = useNodes((state) => state.selectedNode);
  const setSelectedNode = useNodes(
    (state) => state.setSelectedNode as (node?: Node) => void,
  );
  const openRowRef = useRef<{
    id: string | number | undefined;
    close: () => void;
  } | null>(null);

  const closeOpenRow = () => {
    openRowRef.current?.close();
    openRowRef.current = null;
  };

  const handleRowWillOpen = (
    id: string | number | undefined,
    close: () => void,
  ) => {
    if (openRowRef.current?.id !== id) {
      openRowRef.current?.close();
    }
    openRowRef.current = { id, close };
  };

  return (
    <Sheet isOpen={isSheetOpen("nodes")} title="Nodes" onClose={closeSheet}>
      <FlatList
        data={nodes}
        onTouchStart={closeOpenRow}
        onScrollBeginDrag={closeOpenRow}
        renderItem={({ item, index }) => (
          <NodeBar
            {...item}
            isFirst={index === 0}
            isLast={index === nodes!.length - 1}
            isSelected={item.id === selectedNode?.id}
            onPress={() => {
              closeOpenRow();
              setSelectedNode(item as Node);
            }}
            onRowWillOpen={handleRowWillOpen}
          />
        )}
        keyExtractor={(item) => item.id?.toString() || ""}
      />
      <TouchableOpacity style={s.newNodeBtn}>
        <GlassView pointerEvents="none" style={s.glassView} />
        <Text style={s.newNodeBtnText}>New Node</Text>
      </TouchableOpacity>
    </Sheet>
  );
};

const s = StyleSheet.create({
  newNodeBtn: {
    padding: 16,
    width: "100%",
    position: "relative",
    borderRadius: 80,
    marginTop: "auto",
  },
  glassView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 80,
  },
  newNodeBtnText: {
    fontFamily: "inter-medium",
    color: "#bfbfbf",
    fontSize: 17,
    textAlign: "center",
  },
});

export default NodesSheet;
