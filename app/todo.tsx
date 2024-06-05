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

  const [creating, setCreating] = useState(false);

  const [deleting, setDeleting] = useState<TaskItem[]>([]);

  const addTask = async () => {
    if (creating) return;
    if (text.trim() !== "") {
      setCreating(true);
      const payload = new FormData();
      payload.set("task", text);

      await fetch("https://todo-api.dianaclabel.com/agregar-task", {
        method: "POST",
        body: payload,
      });

      setText("");

      setCreating(false);

      loadTasks();
    }
  };

  const deleteTask = async (itemToDelete: TaskItem) => {
    if (deleting.includes(itemToDelete)) return;
    setDeleting([...deleting, itemToDelete]);
    const url = new URL("https://todo-api.dianaclabel.com/borrar-task");
    url.searchParams.set("id", itemToDelete.id);

    await fetch(url, {
      method: "DELETE",
    });

    await loadTasks();

    setDeleting(deleting.filter((item) => item !== itemToDelete));
  };

  const loadTasks = async () => {
    const res = await fetch("https://todo-api.dianaclabel.com/tasks");
    if (res.ok) {
      const data = (await res.json()) as TaskItem[];

      setTasks(data);
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
        style={[styles.addTask, !text && styles.styleDisabled]}
        disabled={!text || creating}
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
              color={deleting.includes(item) ? "gray" : "#ff5010"}
              onPress={() => deleteTask(item)}
              disabled={deleting.includes(item)}
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

  styleDisabled: {
    backgroundColor: "gray",
  },
});

//crear y eliminar
//usar enpoint de contactos: antes de enviar se debe transformar un task a un contacto, no se va a guardar directamente en el state, en su
//lugar se va a volver a ejecutar la funcion loadTasks
