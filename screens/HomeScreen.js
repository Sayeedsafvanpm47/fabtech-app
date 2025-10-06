import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const handleViewServices = () => {
    navigation.navigate('Services');
  };

  const handleBookAppointment = () => {
    navigation.navigate('Bookings');
  };

  const handleViewProjects = () => {
    // For now, just show an alert. You can implement a projects screen later
    alert('Projects feature coming soon!');
  };

  return (
    <ScrollView style={styles.container}>
        
      <View style={styles.header}>
    
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hi, Mr. John Doe</Text>
          </View>
        
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>JD</Text>
          </View>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>To Our Most Advanced & Precision Manufacturing</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.cardGrid}>
          <TouchableOpacity style={styles.gridCard} onPress={handleViewServices}>
            <View style={styles.cardImageContainer}>
              <Text style={styles.cardIcon}>🔧</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>CNC Machining</Text>
              <Text style={styles.cardLocation}>Precision Manufacturing</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={handleViewServices}>
            <View style={styles.cardImageContainer}>
              <Text style={styles.cardIcon}>🖨️</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>3D Printing</Text>
              <Text style={styles.cardLocation}>Rapid Prototyping</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={handleBookAppointment}>
            <View style={styles.cardImageContainer}>
              <Text style={styles.cardIcon}>⚡</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Welding Services</Text>
              <Text style={styles.cardLocation}>Professional Welding</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={handleViewProjects}>
            <View style={styles.cardImageContainer}>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Assembly</Text>
              <Text style={styles.cardLocation}>Complete Assembly</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Clients</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#DC2626',
    padding: 25,
    paddingTop: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 25,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  logoContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    fontSize: 30,
  },
  profileIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FECACA',
    fontWeight: '400',
    lineHeight: 22,
  },
  content: {
    padding: 25,
    marginTop: -20,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  cardImageContainer: {
    height: 120,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 50,
  },
  cardContent: {
    padding: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  cardLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 30,
    marginBottom: 30,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
