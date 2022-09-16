import { useState } from 'react';
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord copiado!', 'Usuario copiado para área de trasnferência!');
    setIsCopping(false);
  }
  return (
    <Modal {...rest} animationType="fade" transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Let´s Play"
            subtitle="Agora é só começar a jopar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}>Adcione o seu discord</Text>

          <TouchableOpacity
            style={styles.discordBtn}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
