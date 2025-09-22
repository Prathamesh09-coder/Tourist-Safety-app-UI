
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, Platform, useWindowDimensions, View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isSmallWidth = width < 360;

  const theme = Colors[colorScheme ?? 'light'];

  const TabBarButton = (props: any) => {
    const { accessibilityState, onPress, onLongPress, children } = props;
    const selected = accessibilityState?.selected;
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        android_ripple={{ color: theme.tabBarBorder }}
        style={({ pressed, hovered }) => [{
          flex: 1,
          marginHorizontal: 8,
          marginVertical: 6,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: hovered ? theme.accent : theme.tabBarBorder,
          backgroundColor: selected
            ? theme.headerBackground
            : hovered
              ? theme.tabBarBackground
              : 'transparent',
          opacity: pressed ? 0.85 : 1,
          alignItems: 'center',
          justifyContent: 'center',
        }]}
      >
        {children}
      </Pressable>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 1,
          height: Platform.select({ ios: 60, android: 64, default: 58 }) + Math.max(insets.bottom, 4),
          paddingTop: 4,
          paddingHorizontal: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingVertical: isLandscape && isSmallWidth ? 0 : 4,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        },
        tabBarLabelStyle: {
          fontSize: isSmallWidth ? 11 : 12,
          fontWeight: '600',
          marginBottom: 2,
          alignSelf: 'center',
          textAlign: 'center',
        },
        tabBarIconStyle: { alignSelf: 'center' },
        headerStyle: {
          backgroundColor: theme.headerBackground,
        },
        headerTitleStyle: {
          color: theme.headerText,
        },
        headerTintColor: theme.headerText,
        tabBarActiveBackgroundColor: theme.headerBackground,
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarHideOnKeyboard: true,
        tabBarButton: TabBarButton,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '      Home      ',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{ width: 20, height: 20, borderRadius: 4, marginRight: 8 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: '700', color: theme.headerText }}>SafeTourist</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, borderWidth: 1, borderColor: theme.tabBarBorder, backgroundColor: theme.tabBarBackground }}>
                <FontAwesome name="user-circle" size={20} color={theme.headerText} />
                <Text style={{ marginLeft: 6, fontSize: 12, fontWeight: '600', color: theme.headerText }}>Guest</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="safety"
        options={{
          title: '     Safety     ',
          tabBarIcon: ({ color }) => <TabBarIcon name="shield" color={color} />,
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: ' Emergency ',
          tabBarIcon: ({ color }) => <TabBarIcon name="exclamation-triangle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="complaint"
        options={{
          title: '  Complaint  ',
          tabBarIcon: ({ color }) => <TabBarIcon name="commenting" color={color} />,
        }}
      />
    </Tabs>
  );
}
