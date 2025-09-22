import React, { useState } from 'react';
import { StyleSheet, ScrollView, View as RNView, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function SafetyScreen() {
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* Geo-fencing & Alerts Section */}
      <Text style={styles.sectionTitle}>Geo-fencing & Alerts</Text>

      <Card variant="map">
        <Text style={styles.mapTitle}>Interactive Map View</Text>
        <RNView style={styles.mapContainer}>
          <RNView style={[styles.mapMarker, { top: 20, left: 20, backgroundColor: '#22c55e' }]} />
          <RNView style={[styles.mapMarker, { top: 20, right: 20, backgroundColor: '#3b82f6' }]} />
          <RNView style={[styles.mapMarker, { bottom: 20, left: 20, backgroundColor: '#f59e0b' }]} />
          <RNView style={[styles.mapMarker, { bottom: 20, right: 20, backgroundColor: '#ef4444' }]} />
          <RNView style={styles.userLocationMarker}>
            <RNView style={styles.userLocationInner} />
          </RNView>
        </RNView>
        <Text style={styles.mapLabel}>User Location Tracker</Text>
      </Card>

      <TouchableOpacity style={styles.zoneButton}>
        <Ionicons name="shield-checkmark" size={24} color="white" />
        <Text style={styles.zoneButtonText}>Safe Zone</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.zoneButton, styles.zoneButtonCaution]}>
        <Ionicons name="warning" size={24} color="white" />
        <Text style={styles.zoneButtonText}>Caution Zone</Text>
      </TouchableOpacity>

      {/* Real-time Tracking */}
      <Card variant="tracking">
        <RNView style={styles.trackingRow}>
          <RNView>
            <Text style={styles.trackingTitle}>Real-time Tracking</Text>
            <Text style={styles.trackingSubtitle}>Optional for families/authorities</Text>
          </RNView>
          <Switch 
            value={trackingEnabled} 
            onValueChange={setTrackingEnabled}
            trackColor={{ false: '#374151', true: '#3b82f6' }}
            thumbColor={trackingEnabled ? '#ffffff' : '#9ca3af'}
          />
        </RNView>
      </Card>
    </ScrollView>
  );
}

function Card({ children, variant }: { children: React.ReactNode; variant?: 'map' | 'tracking' }) {
  const backgroundByVariant: Record<string, string> = {
    map: '#1e3a8a',
    tracking: '#1f2937',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#60a5fa',
    marginBottom: 12,
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#111827',
    borderRadius: 8,
    position: 'relative',
    marginBottom: 12,
  },
  mapMarker: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  userLocationMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  userLocationInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  mapLabel: {
    fontSize: 14,
    color: 'white',
  },
  zoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#22c55e',
  },
  zoneButtonCaution: {
    backgroundColor: '#f59e0b',
  },
  zoneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  trackingSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});
