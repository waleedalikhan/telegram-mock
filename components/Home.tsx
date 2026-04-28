import ChatBox from "@/components/ChatBox";
import Header from "@/components/Header";
import useNodes from "@/stores/nodes";
import { FlatList, View } from "react-native";

const Home: React.FC = () => {
  const selectedNode = useNodes((state) => state.selectedNode);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        data={[
          ...selectedNode?.messages!,
          ...selectedNode?.messages!,
          ...selectedNode?.messages!,
        ]}
        renderItem={({ item }) => (
          <ChatBox
            name={item.sender}
            message={item.text}
            time={item.time}
            avatar={item.avatar}
            badges={item.badges}
            onPress={() => {
              console.log("pressed");
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
