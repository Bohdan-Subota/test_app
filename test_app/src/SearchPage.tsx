import React, { useState, useCallback } from "react";
import { View, TextInput, Text, FlatList, StyleSheet } from "react-native";
import { debounce } from "lodash";
import data from "../assets/data.json"; 

interface User {
  username: string;
  category: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const handleSearch = useCallback(
    debounce((text: string) => {
      if (text.length < 3) {
        setFilteredUsers([]);
        setFilteredCategories([]);
        return;
      }

      const usersResult = data.users.filter((user) =>
        user.username.toLowerCase().includes(text.toLowerCase())
      );

      const categoriesResult = data.categories.filter((category) =>
        category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(usersResult);
      setFilteredCategories(categoriesResult);
    }, 300),
    []
  );

  const handleInputChange = (text: string) => {
    setQuery(text);
    handleSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type to search..."
        value={query}
        onChangeText={handleInputChange}
      />

      {filteredUsers.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Username</Text>
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.username}
            renderItem={({ item }) => {
              return <Text style={styles.resultText}>{item.username}</Text>;
            }}
          />
        </>
      )}

      {filteredCategories.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={filteredCategories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              return <Text style={styles.resultText}>{item}</Text>;
            }}
          />
        </>
      )}

      {query.length >= 3 &&
        filteredUsers.length === 0 &&
        filteredCategories.length === 0 && (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    width: 333,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
    color: "black",
  },
  resultText: {
    fontSize: 16,
    paddingVertical: 4,
    textAlign: "center",
    color: "black",
  },
  noResultsText: {
    fontSize: 16,
    color: "black",
    marginTop: 20,
    textAlign: "center",
  },
});

export default SearchPage;
