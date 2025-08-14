import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../theme';
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync';
import * as Notifications from 'expo-notifications';

export default function CounterScreen() {
  const scheduleNotification = async () => {
    try {
      const permission = await registerForPushNotificationsAsync();
      if (permission !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Activa los permisos de notificaciones para poder programarlas.'
        );
        return;
      }

      const seconds = 5;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Notificación de prueba 📨',
          body: 'Se programó hace unos segundos y la app estaba en primer plano.',
          data: { source: 'counter-test' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds,
        },
      });
      Alert.alert('Programada', `Se mostrará en ~${seconds}s (si iOS >= 60s).`);
    } catch (e: any) {
      Alert.alert(
        'Error',
        e?.message ?? 'No se pudo programar la notificación'
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Programar una notificacion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
