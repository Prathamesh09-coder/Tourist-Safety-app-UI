import React, { useState } from 'react';
import { StyleSheet, ScrollView, View as RNView, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyScreen() {
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* Emergency Panic Button */}
      <Card variant="panic">
        <RNView style={styles.panicContainer}>
          <RNView style={styles.panicCircle}>
            <Ionicons name="warning" size={40} color="white" />
          </RNView>
          <Text style={styles.panicTitle}>Emergency Panic Button</Text>
          <Text style={styles.panicSubtitle}>Hold to activate</Text>
        </RNView>
      </Card>

      {/* Emergency Contact Buttons */}
      <TouchableOpacity style={styles.emergencyButton}>
        <Ionicons name="call" size={20} color="#3b82f6" />
        <Text style={styles.emergencyButtonText}>Nearest Police Station</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.emergencyButton}>
        <Ionicons name="heart" size={20} color="#3b82f6" />
        <Text style={styles.emergencyButtonText}>Emergency Medical</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.emergencyButton}>
        <Ionicons name="people" size={20} color="#3b82f6" />
        <Text style={styles.emergencyButtonText}>Family Contacts</Text>
      </TouchableOpacity>

      {/* Accessibility Options */}
      <Card variant="accessibility">
        <Text style={styles.accessibilityTitle}>Accessibility Options</Text>
        <RNView style={styles.accessibilityButtons}>
          <TouchableOpacity style={styles.accessibilityButton}>
            <Ionicons name="mic" size={20} color="#3b82f6" />
            <Text style={styles.accessibilityButtonText}>Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accessibilityButton}>
            <Ionicons name="chatbubble" size={20} color="#3b82f6" />
            <Text style={styles.accessibilityButtonText}>Text</Text>
          </TouchableOpacity>
        </RNView>
      </Card>

      {/* Live Location */}
      <Card variant="location">
        <RNView style={styles.locationHeader}>
          <RNView style={styles.locationDot} />
          <Text style={styles.locationTitle}>Live Location</Text>
        </RNView>
        <Text style={styles.locationSubtitle}>Shared with emergency contacts</Text>
      </Card>

      {/* Emergency Languages */}
      <Card variant="languages">
        <Text style={styles.languagesTitle}>Emergency Languages</Text>
        <RNView style={styles.languagesGrid}>
          <RNView style={styles.languageColumn}>
            <Text style={styles.languageText}>हिंदी</Text>
            <Text style={styles.languageText}>ਪੰਜਾਬੀ</Text>
          </RNView>
          <RNView style={styles.languageColumn}>
            <Text style={styles.languageText}>English</Text>
            <Text style={styles.languageText}>বাংলা</Text>
          </RNView>
        </RNView>
      </Card>
    </ScrollView>
  );
}

function Card({ children, variant }: { children: React.ReactNode; variant?: 'panic' | 'accessibility' | 'location' | 'languages' }) {
  const backgroundByVariant: Record<string, string> = {
    panic: '#dc2626',
    accessibility: '#1f2937',
    location: '#1e40af',
    languages: '#16a34a',
  };
  return (
    <RNView style={[styles.card, variant ? { backgroundColor: backgroundByVariant[variant] } : styles.defaultCard]}>
      {children}
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scroll: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  defaultCard: {
    backgroundColor: '#1f2937',
  },
  panicContainer: {
    alignItems: 'center',
    gap: 12,
  },
  panicCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  panicSubtitle: {
    fontSize: 14,
    color: '#fca5a5',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#1f2937',
  },
  emergencyButtonText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  accessibilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  accessibilityButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  accessibilityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#374151',
  },
  accessibilityButtonText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  locationSubtitle: {
    fontSize: 12,
    color: '#60a5fa',
  },
  languagesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  languagesGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  languageColumn: {
    flex: 1,
    gap: 8,
  },
  languageText: {
    fontSize: 14,
    color: '#22c55e',
  },
});
