import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type TaskItem = {
  id: string;
  task: string;
};

export default function Todo() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim() !== "") {
      setTasks([...tasks, { task: text, id: crypto.randomUUID() }]);
      setText("");
    }
  };

  const deleteTask = (itemToDelete: TaskItem) => {
    const newArray = tasks.filter((item) => item !== itemToDelete);

    setTasks(newArray);
  };

  const loadTasks = async () => {
    const res = await fetch("https://contactos-api.duna.dev/contactos");
    if (res.ok) {
      const data = (await res.json()) as { id: string; nombre: string }[];

      const initialTasks: TaskItem[] = data.map((item) => {
        const itemObject: TaskItem = {
          id: item.id,
          task: item.nombre,
        };
        return itemObject;
      });

      setTasks(initialTasks);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(newText) => {
          setText(newText);
        }}
        onSubmitEditing={addTask}
      />

      <Pressable
        onPress={addTask}
        style={[styles.addTask, !text && styles.addTaskDisabled]}
        disabled={!text}
      >
        <Text style={styles.textTask}>Agregar</Text>
      </Pressable>

      <FlatList
        style={styles.taskList}
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.task}</Text>
            <Button
              title="x"
              color={"#ff5010"}
              onPress={() => deleteTask(item)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",

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
    backgroundColor: "white",
  },

  taskList: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "white",
  },

  item: {
    padding: 8,
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addTask: {
    borderRadius: 10,
    backgroundColor: "green",
    padding: 10,
  },

  textTask: {
    textAlign: "center",
    color: "white",
  },

  addTaskDisabled: {
    backgroundColor: "gray",
  },
});
