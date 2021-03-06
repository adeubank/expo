import React from 'react';
import { Button, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaConsumer, SafeAreaView, useSafeArea } from 'react-native-safe-area-context';

import HeadingText from '../components/HeadingText';

export default function SafeAreaContextScreen({ navigation }: { navigation: any }) {
  const [focused, setFocused] = React.useState<'hook' | 'view'>('hook');
  const insets = useSafeArea();

  if (focused === 'hook') {
    return (
      <SafeAreaConsumer>
        {consumerInsets => (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingTop: insets.top,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <HeadingText>Using useSafeArea hook</HeadingText>
            <Text style={{ marginVertical: 10 }}>{JSON.stringify(insets, null, 2)}</Text>
            <HeadingText>Using SafeAreaConsumer component</HeadingText>
            <Text style={{ marginVertical: 10 }}>{JSON.stringify(consumerInsets, null, 2)}</Text>
            <Button title="Switch to SafeAreaView" onPress={() => setFocused('view')} />
            <View style={{ marginVertical: Platform.OS === 'ios' ? 0 : 10 }} />
            <Button title="Go back to APIs" onPress={() => navigation.goBack()} />
          </ScrollView>
        )}
      </SafeAreaConsumer>
    );
  } else {
    return (
      <SafeAreaView style={{ alignItems: 'center' }}>
        <HeadingText>Using SafeAreaView</HeadingText>
        <Text style={{ marginVertical: 10, textAlign: 'center' }}>
          If it works as expected then the above heading will not be obscured by a device notch or
          status bar.
        </Text>
        <Button
          title="Switch to SafeAreaConsumer & useSafeArea hook"
          onPress={() => setFocused('hook')}
        />
        <View style={{ marginVertical: Platform.OS === 'ios' ? 0 : 10 }} />
        <Button title="Go back to APIs" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }
}

SafeAreaContextScreen.navigationOptions = {
  title: 'Safe Area Context',
  header: null,
};
