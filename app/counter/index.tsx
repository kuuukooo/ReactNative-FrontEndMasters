import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../theme';
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Duration, intervalToDuration, isBefore } from 'date-fns';
import { TimeSegment } from '../../components/TimeSegment';

//10 segundos a partir de ahora
const timestamp = Date.now() + 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { end: Date.now(), start: timestamp }
          : { start: Date.now(), end: timestamp }
      );

      setStatus({ isOverdue, distance });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {status.isOverdue ? (
        <Text style={[styles.heading, styles.whiteText]}>
          Cosa atrasada por
        </Text>
      ) : (
        <Text style={styles.heading}>Cosa en curso por</Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          unit='Days'
          number={status.distance.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit='Hours'
          number={status.distance.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit='Minutes'
          number={status.distance.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit='Seconds'
          number={status.distance.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Ya la hice!</Text>
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
  row: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: theme.colorWhite,
  },
});
