import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import data from "./assets/data.json";
import SearchPage from "./src/SearchPage";

export default function App() {
  return (
    <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
      <SearchPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
