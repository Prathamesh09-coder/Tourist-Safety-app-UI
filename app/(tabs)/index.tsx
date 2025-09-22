import React, { useState } from 'react';
import { StyleSheet, ScrollView, View as RNView, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      {/* Header */}
      <RNView style={styles.header}>
        <RNView style={styles.logoContainer}>
          <Ionicons name="shield" size={40} color="white" />
        </RNView>
        <Text style={styles.appTitle}>SafeTourist</Text>
        <Text style={styles.appSubtitle}>Advanced Tourist Safety System</Text>
      </RNView>

      {/* Main Dashboard Section */}
      <Text style={styles.sectionTitle}>Main Dashboard</Text>
      
      <Card variant="highlighted">
        <RNView style={styles.idCardHeader}>
          <Ionicons name="card" size={20} color="#3b82f6" />
          <Text style={styles.idCardTitle}>Digital Tourist ID Status</Text>
        </RNView>
        <Text style={styles.profileStatus}>Profile Complete</Text>
        <RNView style={styles.progressContainer}>
          <RNView style={styles.progressTrack}>
            <RNView style={[styles.progressFill, { width: '85%' }]} />
          </RNView>
          <Text style={styles.progressText}>85%</Text>
        </RNView>
      </Card>

      {/* Safety Score Card */}
      <Card variant="safety">
        <RNView style={styles.safetyScoreContainer}>
          <RNView style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>85</Text>
          </RNView>
          <Text style={styles.safetyScoreLabel}>Safety Score</Text>
          <RNView style={styles.safetyProgressTrack}>
            <RNView style={[styles.safetyProgressFill, { width: '85%' }]} />
          </RNView>
        </RNView>
      </Card>

      {/* Navigation Buttons */}
      <ListButton 
        label="Current Location" 
        icon="location" 
        dotColor="#ef4444"
        iconColor="white"
      />
      <ListButton 
        label="Planned Route" 
        icon="map" 
        dotColor="#3b82f6"
        iconColor="white"
      />
      <ListButton 
        label="Nearby Services" 
        icon="business" 
        dotColor="#22c55e"
        iconColor="white"
      />

      {/* Language Support Section */}
      <Card variant="language">
        <RNView style={styles.languageHeader}>
          <Ionicons name="globe" size={20} color="white" />
          <Text style={styles.languageTitle}>10+ Languages Support</Text>
        </RNView>
        <RNView style={styles.languageGrid}>
          {['EN', 'ES', 'FR', 'DE', 'IT', 'JA', 'KO', 'ZH', 'HI', 'AR'].map((lang) => (
            <RNView key={lang} style={styles.languageButton}>
              <Text style={styles.languageText}>{lang}</Text>
            </RNView>
          ))}
        </RNView>
      </Card>
    </ScrollView>
  );
}

function Card({ children, variant }: { children: React.ReactNode; variant?: 'highlighted' | 'safety' | 'language' }) {
  const backgroundByVariant: Record<string, string> = {
    highlighted: '#1f2937',
    safety: '#16a34a',
    language: '#16a34a',
  };
  return (
    <RNView style={[styles.card, variant ? { backgroundColor: backgroundByVariant[variant] } : styles.defaultCard]}>
      {children}
    </RNView>
  );
}

function ListButton({ label, icon, dotColor, iconColor }: { 
  label: string; 
  icon: string; 
  dotColor: string; 
  iconColor: string; 
}) {
  return (
    <TouchableOpacity style={styles.listButton}>
      <RNView style={[styles.dot, { backgroundColor: dotColor }]} />
      <Ionicons name={icon as any} size={20} color={iconColor} />
      <Text style={styles.listButtonText}>{label}</Text>
    </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  defaultCard: {
    backgroundColor: '#1f2937',
  },
  idCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  idCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  profileStatus: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#374151',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  safetyScoreContainer: {
    alignItems: 'center',
    gap: 12,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  safetyScoreLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  safetyProgressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: '#374151',
    overflow: 'hidden',
  },
  safetyProgressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#1f2937',
  },
  listButtonText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#22c55e',
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});
