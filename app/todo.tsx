import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function Todo() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />

      <FlatList
        style={styles.taskList}
        data={[{ task: "Lavar" }, { task: "Cocinar" }, { task: "Dormir" }]}
        renderItem={({ item }) => <Text style={styles.item}>{item.task}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#eebbbb",
    width: "100%",
    maxWidth: 600,
    height: "100%",
    marginHorizontal: "auto",
    padding: 20,
    gap: 20,
  },

  input: {
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },

  taskList: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },

  item: {
    padding: 8,
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});
