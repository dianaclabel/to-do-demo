import { Counter } from "@/components/Counter";
import { ExternalLink } from "@/components/ExternalLink";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this window.</Text>
      <ExternalLink href="https://duna.dev">Duna</ExternalLink>
      <Counter nombre="a todos" apellido="Clabel" edad={25}></Counter>
      <Link href={"Contacto"}>Contacto</Link>
    </View>
  );
}
