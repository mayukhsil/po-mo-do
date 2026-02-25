import React from 'react';
import { StyleSheet, Image } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function Explore() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#a8dadc', dark: '#1d3d47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About Pomodoro</ThemedText>
      </ThemedView>

      <ThemedText style={styles.paragraph}>
        The Pomodoro Technique is a simple time‑management method that breaks work into
        intervals (traditionally 25 minutes) separated by short breaks. Use the Home tab to
        start a focus session; when the timer finishes, take a 5‑minute break.
      </ThemedText>
      <ThemedText style={styles.paragraph}>
        Feel free to customise durations in <ThemedText type="defaultSemiBold">src/navigation/screens/Home.tsx</ThemedText>.
      </ThemedText>
      <ThemedText style={styles.paragraph}>
        Happy focusing! 🍅
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  paragraph: {
    marginBottom: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});