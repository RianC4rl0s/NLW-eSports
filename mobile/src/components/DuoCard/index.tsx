
import { TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { GameController } from "phosphor-react-native"


import { styles } from './styles';
import { Text } from 'react-native';

export interface DuoCardProps {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  hourStart: 1080,
  hourEnd: 1320,
  useVoiceChannel: boolean
}
interface Props {
  data: DuoCardProps;
  onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {



  return (
    <View style={styles.container}>
      <DuoInfo label='Nome' value={data.name} />
      <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} anos`} />
      <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd} `} />
      <DuoInfo label='Chamada de áudio?' value={data.useVoiceChannel ? "Sim" : "Não"} colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} />
      <TouchableOpacity
        style={styles.buttom}
        onPress={onConnect}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttomTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}