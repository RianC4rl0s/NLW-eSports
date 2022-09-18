import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';

import { styles } from './styles';

import logoImg from "../../assets/logo-nlw-esports.png"
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProp } from '../../components/GameCard';

import { GAMES } from '../../utils/games';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';

import { useNavigation } from "@react-navigation/native"

export function Home() {

  const [games, setGames] = useState<GameCardProp[]>([])

  const navigation = useNavigation()

  function handleOpenGame({id,title,banner}:GameCardProp) {
    navigation.navigate('game',{id,title,banner});
  }

  useEffect(() => {
    fetch("http://192.168.1.6:3333/games")
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <Background>

      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logoImg} />
        <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />
        <FlatList
          horizontal
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={
                () =>handleOpenGame(item)
              }
            />

          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        >

        </FlatList>
      </SafeAreaView>
    </Background>
  );
}