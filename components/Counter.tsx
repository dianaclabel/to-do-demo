import { Text, View } from "react-native";

type Props = {
  nombre: string;
  apellido: string;
  edad: number;
};

export const Counter = ({ edad, ...others }: Props) => {
  return (
    <View>
      <Text>Hola {others.nombre} </Text>
      <Text>Hola {others.apellido}</Text>
      <Text>edad es: {edad}</Text>
    </View>
  );
};
