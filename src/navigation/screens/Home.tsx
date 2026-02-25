import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Session = 'work' | 'break';

type ControlButtonProps = {
  label: string;
  onPress: () => void;
  color: string;
};

function ControlButton({ label, onPress, color }: ControlButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <ThemedText style={styles.buttonText}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

export function Home() {
  const WORK_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;

  const [session, setSession] = React.useState<Session>('work');
  const [secondsLeft, setSecondsLeft] = React.useState(WORK_DURATION);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            onSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, session]);

  const onSessionEnd = () => {
    setIsRunning(false);
    const next: Session = session === 'work' ? 'break' : 'work';
    setSession(next);
    setSecondsLeft(next === 'work' ? WORK_DURATION : BREAK_DURATION);
    import('expo-haptics').then((Haptics) =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    );
  };

  const toggle = () => setIsRunning((r) => !r);
  const reset = () => {
    setIsRunning(false);
    setSession('work');
    setSecondsLeft(WORK_DURATION);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText type="title">Pomodoro</ThemedText>
        <ThemedText style={styles.sessionPill}>
          {session === 'work' ? 'Focus' : 'Break'}
        </ThemedText>
      </View>

      <ThemedView style={styles.timerCard}>
        <ThemedText style={styles.timerValue}>{formatTime(secondsLeft)}</ThemedText>
        <ThemedText style={styles.timerHint}>Tap start to begin</ThemedText>
      </ThemedView>

      <View style={styles.controls}>
        <ControlButton
          label={isRunning ? 'Pause' : 'Start'}
          onPress={toggle}
          color={isRunning ? '#f4a261' : '#2a9d8f'}
        />
        <ControlButton label="Reset" onPress={reset} color="#e76f51" />
      </View>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 14,
  },
  timerCard: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    alignContent: 'center',
    gap: 0,
    alignSelf: 'stretch',
    height: 200,
    width: '100%',
  },
  timerValue: {
    paddingTop: 84,
    fontSize: 64,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  timerHint: {
    fontSize: 14,
    opacity: 0.7,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
