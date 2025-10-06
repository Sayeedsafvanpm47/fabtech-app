import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function ServicesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const services = [
    {
      id: 1,
      title: 'CNC Machining',
      description: 'Precision machining services for complex parts',
      price: 'From $50/hour',
      image: '🔧',
      rating: 4.8,
      reviews: 124,
      category: 'Machining',
      duration: '2-5 days',
    },
    {
      id: 2,
      title: '3D Printing',
      description: 'Rapid prototyping and production parts',
      price: 'From $25/hour',
      image: '🖨️',
      rating: 4.6,
      reviews: 89,
      category: 'Prototyping',
      duration: '1-3 days',
    },
    {
      id: 3,
      title: 'Welding Services',
      description: 'Professional welding for all materials',
      price: 'From $40/hour',
      image: '⚡',
      rating: 4.7,
      reviews: 156,
      category: 'Fabrication',
      duration: '1-2 days',
    },
    {
      id: 4,
      title: 'Sheet Metal Work',
      description: 'Custom sheet metal fabrication',
      price: 'From $35/hour',
      image: '📐',
      rating: 4.5,
      reviews: 98,
      category: 'Fabrication',
      duration: '2-4 days',
    },
    {
      id: 5,
      title: 'Assembly Services',
      description: 'Complete product assembly and testing',
      price: 'From $30/hour',
      image: '🔩',
      rating: 4.9,
      reviews: 203,
      category: 'Assembly',
      duration: '1-3 days',
    },
    {
      id: 6,
      title: 'Design Consultation',
      description: 'Engineering design and optimization',
      price: 'From $75/hour',
      image: '📊',
      rating: 4.8,
      reviews: 67,
      category: 'Consulting',
      duration: '1-2 days',
    },
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServicePress = (service) => {
    navigation.navigate('ServiceDetail', { service });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Book Mark</Text>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>⚙️</Text>
          </View>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>JD</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Service, Search here"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        {filteredServices.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard} onPress={() => handleServicePress(service)}>
            <View style={styles.serviceImageContainer}>
              <Text style={styles.serviceIcon}>{service.image}</Text>
              <View style={styles.heartIcon}>
                <Text style={styles.heartText}>❤️</Text>
              </View>
            </View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceLocation}>{service.category} • {service.duration}</Text>
              <Text style={styles.serviceDetails}>-2 persons</Text>
              <Text style={styles.serviceDetails}>-1 Deluxe Service</Text>
              <View style={styles.serviceFooter}>
                <TouchableOpacity style={styles.priceButton}>
                  <Text style={styles.priceText}>{service.price}</Text>
                </TouchableOpacity>
                <Text style={styles.rating}>Rating {service.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
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
    fontSize: 24,
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
  searchContainer: {
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#6B7280',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  content: {
    padding: 25,
    marginTop: -20,
  },
  serviceCard: {
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
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  serviceImageContainer: {
    width: 100,
    height: 120,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  serviceIcon: {
    fontSize: 40,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heartText: {
    fontSize: 16,
  },
  serviceContent: {
    flex: 1,
    padding: 18,
    justifyContent: 'space-between',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  serviceLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  serviceDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 3,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priceButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rating: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
});