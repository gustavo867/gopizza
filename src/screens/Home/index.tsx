import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import * as S from "./styles";

import happyEmoji from "assets/happy.png";

import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { Search } from "src/components/Search";
import { ProductCard, ProductProps } from "src/components/ProductCard";

import firestore from "@react-native-firebase/firestore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Home: React.FC = () => {
  const theme = useTheme();
  const safeArea = useSafeAreaInsets();

  const { navigate } = useNavigation();

  const [pizzas, setPizzas] = useState([] as ProductProps[]);
  const [search, setSearch] = useState("");

  const fetchPizzas = useCallback((value: string) => {
    const formattedValue = value.toLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((res) => {
        const data = res.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch((err) => {
        console.log("err", err);

        Alert.alert("Consulta", "Não foi possível realizar a consulta");
      });
  }, []);

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleAdd() {
    navigate("product", { id: undefined });
  }

  function handleSearchClear() {
    fetchPizzas("");
    setSearch("");
  }

  function handleOpen(id: string) {
    navigate("product", { id });
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  return (
    <S.Container>
      <S.Header
        style={{
          paddingTop: safeArea.top + 15,
        }}
      >
        <S.Greeting>
          <S.GreetingEmoji source={happyEmoji} />
          <S.GreetingText>Olá, Admin</S.GreetingText>
        </S.Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={theme.COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </S.Header>
      <Search
        value={search}
        onChangeText={setSearch}
        onClear={handleSearchClear}
        onSearch={handleSearch}
      />
      <S.MenuHeader>
        <S.MenuItemsTitle>Cardápio</S.MenuItemsTitle>
        <S.MenuItemsNumber>
          {pizzas.length} {pizzas.length !== 1 ? "pizzas" : "pizza"}
        </S.MenuItemsNumber>
      </S.MenuHeader>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard onPress={() => handleOpen(item.id)} data={item} />
        )}
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 125,
        }}
      />
      <S.NewProductButton
        style={{
          marginBottom: safeArea.bottom,
        }}
        title="Cadastra Pizza"
        type="secondary"
        onPress={handleAdd}
      />
    </S.Container>
  );
};

export { Home };
