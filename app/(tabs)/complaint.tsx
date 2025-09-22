import React, { useMemo, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Platform, Switch, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { submitComplaint } from '@/lib/api';

export default function ComplaintScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const canSubmit = useMemo(() => title.trim().length > 2 && details.trim().length > 10, [title, details]);

  async function onSubmit() {
    if (!canSubmit) {
      Alert.alert('Incomplete', 'Please provide a title and detailed description.');
      return;
    }
    try {
      setIsSubmitting(true);
      const payload = {
        reporter: anonymous ? 'Anonymous' : (name || 'Guest'),
        contact: anonymous ? undefined : (contact || undefined),
        category: category || 'General',
        title: title.trim(),
        details: details.trim(),
        address: address || undefined,
        createdAt: new Date().toISOString(),
      };
      const res = await submitComplaint(payload);
      if (!res.ok) throw new Error('Request failed');
      Alert.alert('Complaint submitted', 'Thank you. We will review your report.');
      setTitle('');
      setDetails('');
      setAddress('');
    } catch (e) {
      Alert.alert('Submission failed', 'Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.card, { backgroundColor: theme.headerBackground, borderColor: theme.tabBarBorder }]}> 
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Image
            source={require('../../assets/images/image.png')}
            style={{ width: 24, height: 24, borderRadius: 6, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text style={[styles.title, { color: theme.headerText }]}>Submit a Complaint</Text>
        </View>
        <Text style={[styles.paragraph, { color: theme.text }]}>Describe the issue you encountered. We'll route it to local authorities or support as appropriate.</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.headerBackground, borderColor: theme.tabBarBorder }]}> 
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="person-circle-outline" size={18} color={theme.headerText} style={{ marginRight: 6 }} />
          <Text style={[styles.subtitle, { color: theme.headerText }]}>Reporter Info</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.headerText }]}>Report Anonymously</Text>
          <Switch value={anonymous} onValueChange={setAnonymous} trackColor={{ false: '#9ca3af', true: theme.tint }} />
        </View>
        {!anonymous && (
          <>
            <Text style={[styles.label, { color: theme.headerText }]}>Your Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor={theme.tabIconDefault}
              style={[styles.input, { borderColor: theme.tabBarBorder, color: name.trim().length ? '#000' : theme.text, backgroundColor: Platform.select({ ios: '#fff', android: '#fff', default: '#fff' }) }]}
            />
            <Text style={[styles.label, { color: theme.headerText }]}>Contact (email or phone)</Text>
            <TextInput
              value={contact}
              onChangeText={setContact}
              placeholder="Optional, for follow-up"
              placeholderTextColor={theme.tabIconDefault}
              style={[styles.input, { borderColor: theme.tabBarBorder, color: contact.trim().length ? '#000' : theme.text, backgroundColor: Platform.select({ ios: '#fff', android: '#fff', default: '#fff' }) }]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </>
        )}
      </View>

      <View style={[styles.card, { backgroundColor: theme.headerBackground, borderColor: theme.tabBarBorder }]}> 
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="alert-circle-outline" size={18} color={theme.headerText} style={{ marginRight: 6 }} />
          <Text style={[styles.subtitle, { color: theme.headerText }]}>Incident Details</Text>
        </View>

        <Text style={[styles.label, { color: theme.headerText }]}>Category</Text>
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="e.g., Theft, Harassment, Lost Item"
          placeholderTextColor={theme.tabIconDefault}
          style={[styles.input, { borderColor: theme.tabBarBorder, color: category.trim().length ? '#000' : theme.text, backgroundColor: Platform.select({ ios: '#fff', android: '#fff', default: '#fff' }) }]}
        />

        <Text style={[styles.label, { color: theme.headerText }]}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Short summary"
          placeholderTextColor={theme.tabIconDefault}
          style={[styles.input, { borderColor: theme.tabBarBorder, color: title.trim().length ? '#000' : theme.text, backgroundColor: Platform.select({ ios: '#fff', android: '#fff', default: '#fff' }) }]}
        />

        <Text style={[styles.label, { color: theme.headerText }]}>Details</Text>
        <TextInput
          value={details}
          onChangeText={setDetails}
          placeholder="Please include time, location, and any details"
          placeholderTextColor={theme.tabIconDefault}
          style={[styles.textarea, { borderColor: theme.tabBarBorder, color: details.trim().length ? '#000' : theme.text, backgroundColor: Platform.select({ ios: '#fff', android: '#fff', default: '#fff' }) }]}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      <View style={[styles.card, { backgroundColor: theme.headerBackground, borderColor: theme.tabBarBorder }]}> 
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="location-outline" size={18} color={theme.headerText} style={{ marginRight: 6 }} />
          <Text style={[styles.subtitle, { color: theme.headerText }]}>Location</Text>
        </View>
        <Text style={[styles.label, { color: theme.headerText }]}>Address or Place</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Nearest address or landmark"
          placeholderTextColor={theme.tabIconDefault}
          style={[styles.input, { borderColor: theme.tabBarBorder, color: address.trim().length ? '#000' : theme.text, backgroundColor: Platform.select({ ios: '#fff', android: '#fff', default: '#fff' }) }]}
        />
      </View>

      <View style={[styles.card, { backgroundColor: theme.headerBackground, borderColor: theme.tabBarBorder }]}> 
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="shield-checkmark-outline" size={18} color={theme.headerText} style={{ marginRight: 6 }} />
          <Text style={[styles.subtitle, { color: theme.headerText }]}>Privacy & Consent</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => setConsentAccepted((v) => !v)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: consentAccepted }}
            style={{ marginRight: 10, marginTop: 1 }}
          >
            <Ionicons
              name={consentAccepted ? 'checkbox-outline' : 'square-outline'}
              size={22}
              color={consentAccepted ? theme.tint : theme.headerText}
            />
          </TouchableOpacity>
          <Text style={[styles.paragraph, { color: theme.text, flex: 1 }]}>By submitting, you agree that non-personal details may be shared with local authorities to improve safety for everyone.</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        disabled={!canSubmit || isSubmitting || !consentAccepted}
        accessibilityRole="button"
        style={[
          styles.submitButton,
          { backgroundColor: canSubmit && consentAccepted ? '#22c55e' : '#9ca3af', opacity: isSubmitting ? 0.8 : 1 },
        ]}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="send" size={20} color="#fffff" style={{ marginRight: 8 }} />
            <Text style={styles.submitLabel}>Submit Complaint</Text>
          </View>
        )}
      </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
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
  submitButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 0,
    marginBottom: 24,
  },
  submitLabel: {
    color: '#fffff',
    fontSize: 16,
    fontWeight: '700',
  },
});



