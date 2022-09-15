import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Background } from '../../components/Background';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
  const [duo, setDuo] = useState<DuoCardProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://10.3.152.14:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuo(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duo}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          contentContainerStyle={[
            duo.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
