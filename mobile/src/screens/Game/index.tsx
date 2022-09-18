import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native"
import { styles } from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { GameParam } from '../../@types/navigation';
import logoImg from "../../assets/logo-nlw-esports.png"
import { DuoMatch } from "../../components/DuoMatch"


import { Entypo } from "@expo/vector-icons"
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';

export function Game() {

  const navigation = useNavigation()
  const route = useRoute();
  const game = route.params as GameParam;
  //console.log(game)

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId:string) {
    fetch(`http://192.168.1.6:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => {
        setDiscorDuoSelected(data.discord)
      })
  }

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscorDuoSelected] = useState('')

  useEffect(() => {
    fetch(`http://192.168.1.6:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => {
        setDuos(data)
      })
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />


          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}></View>


        </View>
        <Image source={{ uri: game.banner }}
          style={styles.cover} resizeMode="cover"></Image>
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!"></Heading>
        <FlatList
          horizontal
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            ></DuoCard>

          )}
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para esse jogo
            </Text>
          )}
        ></FlatList>
        <DuoMatch
          onClose={()=>setDiscorDuoSelected("")}
          discord={discordDuoSelected}
          visible={discordDuoSelected.length > 0}
        >

        </DuoMatch>
      </SafeAreaView>
    </Background>
  );
}