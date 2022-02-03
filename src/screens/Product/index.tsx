import React, { useState } from "react";
import { Alert, Platform, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonBack } from "src/components/ButtonBack";
import { Photo } from "src/components/Photo";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import * as ImagePicker from "expo-image-picker";

import * as S from "./styles";
import { InputPrice } from "src/components/InputPrice";
import { Input } from "src/components/Input";
import { Button } from "src/components/Button";

const Product: React.FC = () => {
  const safeArea = useSafeAreaInsets();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prices, setPrices] = useState({
    p: "",
    m: "",
    g: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setAvatarUri(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!name) {
      return Alert.alert("Cadastro", "Informe o nome da pizza.");
    }

    if (!description) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza.");
    }

    if (!avatarUri) {
      return Alert.alert("Cadastro", "Selecione a imagem da pizza.");
    }

    if (!prices.p || !prices.m || !prices.g) {
      return Alert.alert(
        "Cadastro",
        "Informe o preço de todos os tamanhos de pizza."
      );
    }

    setIsLoading(true);

    try {
      const fileName = new Date().getTime();
      const reference = storage().ref(`/pizzas/${fileName}.png`);

      await reference.putFile(avatarUri);

      const photo_url = await reference.getDownloadURL();

      firestore()
        .collection("pizzas")
        .add({
          name,
          name_insensitive: name.toLowerCase().trim(),
          description,
          prices_sizes: prices,
          photo_url: photo_url,
          photo_path: reference.fullPath,
        })
        .then((res) => Alert.alert("Cadastro", "Pizza cadastrada com sucesso"))
        .catch((err) =>
          Alert.alert("Cadastro", "Não foi possível cadastrar a pizza")
        );

      setIsLoading(false);
    } catch (err) {
      console.log("erro", err);

      Alert.alert("Cadastro", "Não foi possível cadastrar a pizza");

      setIsLoading(false);
    }
  }

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <S.Header
        style={{
          paddingTop: safeArea.top,
        }}
      >
        <ButtonBack />
        <S.Title>Cadastrar</S.Title>

        <TouchableOpacity>
          <S.DeleteLabel>Deletar</S.DeleteLabel>
        </TouchableOpacity>
      </S.Header>
      <ScrollView
        style={{
          marginBottom: safeArea.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <S.Upload>
          <Photo uri={avatarUri} />
          <S.PickImageButton
            onPress={() => handlePickerImage()}
            title="Carregar"
            type="secondary"
          />
        </S.Upload>

        <S.Form>
          <S.InputGroup>
            <S.Label>Nome</S.Label>
            <Input onChangeText={setName} value={name} />
          </S.InputGroup>

          <S.InputGroup>
            <S.InputGroupHeader>
              <S.Label>Descrição</S.Label>
              <S.MaxCharacters>0 de 60 caracteres</S.MaxCharacters>
            </S.InputGroupHeader>
            <Input
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={60}
              style={{ height: 80 }}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Tamanho e preços</S.Label>

            <InputPrice
              size="P"
              value={prices.p}
              onChangeText={(text) =>
                setPrices((s) => ({
                  ...s,
                  p: text,
                }))
              }
            />
            <InputPrice
              size="M"
              value={prices.m}
              onChangeText={(text) =>
                setPrices((s) => ({
                  ...s,
                  m: text,
                }))
              }
            />
            <InputPrice
              size="G"
              value={prices.g}
              onChangeText={(text) =>
                setPrices((s) => ({
                  ...s,
                  g: text,
                }))
              }
            />
          </S.InputGroup>

          <Button
            onPress={() => handleAdd()}
            title="Cadastrar Pizza"
            isLoading={isLoading}
          />
        </S.Form>
      </ScrollView>
    </S.Container>
  );
};

export { Product };
