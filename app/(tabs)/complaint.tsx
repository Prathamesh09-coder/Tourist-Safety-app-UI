import { StyleSheet, ScrollView, View, Text, TextInput, Platform } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function ComplaintScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.card, { backgroundColor: theme.headerBackground, borderColor: theme.tabBarBorder }]}> 
        <Text style={[styles.title, { color: theme.headerText }]}>Submit a Complaint</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>Describe the issue you encountered. We'll route it to local authorities or support as appropriate.</Text>

        <Text style={[styles.label, { color: theme.headerText }]}>Title</Text>
        <TextInput
          placeholder="Short summary"
          placeholderTextColor={theme.tabIconDefault}
          style={[styles.input, { borderColor: theme.tabBarBorder, color: theme.text, backgroundColor: Platform.select({ ios: '#fff', android: '#fff', default: '#fff' }) }]}
        />

        <Text style={[styles.label, { color: theme.headerText }]}>Details</Text>
        <TextInput
          placeholder="Please include time, location, and any details"
          placeholderTextColor={theme.tabIconDefault}
          style={[styles.textarea, { borderColor: theme.tabBarBorder, color: theme.text, backgroundColor: Platform.select({ ios: '#fff', android: '#fff', default: '#fff' }) }]}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.select({ ios: 12, android: 8, default: 10 }),
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 120,
  },
});


