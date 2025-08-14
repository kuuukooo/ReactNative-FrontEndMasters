import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../../theme';
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Duration, intervalToDuration, isBefore } from 'date-fns';
import { TimeSegment } from '../../components/TimeSegment';
import { getFromStorage, saveToStorage } from '../../utils/storage';

// 10 segundos en ms (ajusta a tu necesidad real)
const frequency = 10 * 1000;
const countdownStorageKey = 'taskly-countdown';

type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[]; // historial (más reciente primero)
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration; // diferencia entre ahora y el siguiente deadline (o tiempo transcurrido si está atrasado)
};

export default function CounterScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {} as Duration,
  });

  // Última vez que se marcó como completado
  const lastCompletedAt = countdownState?.completedAtTimestamps[0];

  // Carga inicial desde storage
  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
      setIsLoading(false);
    };
    init();
  }, []);

  // Actualiza el countdown cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextDueTimestamp = lastCompletedAt
        ? lastCompletedAt + frequency
        : Date.now() + frequency; // primera vez: fija un deadline a futuro

      const overdue = isBefore(nextDueTimestamp, Date.now());

      const distance = intervalToDuration(
        overdue
          ? { start: nextDueTimestamp, end: Date.now() } // tiempo de atraso
          : { start: Date.now(), end: nextDueTimestamp } // tiempo restante
      );

      setStatus({ isOverdue: overdue, distance });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [lastCompletedAt]);

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

      // Programa nueva notificación
      const newNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'La tarea está pendiente!',
          body: 'Marca como hecha para reiniciar el ciclo.',
          data: { source: 'counter' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: Math.floor(frequency / 1000),
        },
      });

      // Cancela la notificación anterior si existía
      if (countdownState?.currentNotificationId) {
        try {
          await Notifications.cancelScheduledNotificationAsync(
            countdownState.currentNotificationId
          );
        } catch {
          /* ignore */
        }
      }

      const now = Date.now();
      const newState: PersistedCountdownState = {
        currentNotificationId: newNotificationId,
        completedAtTimestamps: countdownState
          ? [now, ...countdownState.completedAtTimestamps]
          : [now],
      };

      setCountdownState(newState);
      await saveToStorage(countdownStorageKey, newState);
    } catch (e: any) {
      Alert.alert(
        'Error',
        e?.message ?? 'No se pudo programar la notificación'
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator />
      </View>
    );
  }

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
  activityIndicatorContainer: {
    backgroundColor: theme.colorWhite,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
