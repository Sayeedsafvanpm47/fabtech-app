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
    // navigation.navigate('ServiceDetail', { service });
    console.log('Service pressed:', service.title);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Services</Text>
            <Text style={styles.subtitle}>Browse our manufacturing services</Text>
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
              placeholder="Search services..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {searchQuery ? 'Search Results' : 'Available Services'} ({filteredServices.length})
        </Text>
        
        {filteredServices.map((service) => (
          <TouchableOpacity 
            key={service.id} 
            style={styles.serviceCard} 
            onPress={() => handleServicePress(service)}
            activeOpacity={0.7}
          >
            <View style={styles.serviceImageContainer}>
              <Text style={styles.serviceIcon}>{service.image}</Text>
            </View>
            
            <View style={styles.serviceContent}>
              <View style={styles.serviceHeader}>
                <View style={styles.serviceTitleContainer}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{service.category}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Text style={styles.favoriteIcon}>❤️</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.serviceDescription} numberOfLines={2}>
                {service.description}
              </Text>
              
              <View style={styles.serviceMetadata}>
                <View style={styles.metadataItem}>
                  <Text style={styles.metadataIcon}>⏱️</Text>
                  <Text style={styles.metadataText}>{service.duration}</Text>
                </View>
                <View style={styles.metadataItem}>
                  <Text style={styles.metadataIcon}>⭐</Text>
                  <Text style={styles.metadataText}>
                    {service.rating} ({service.reviews})
                  </Text>
                </View>
              </View>
              
              <View style={styles.serviceFooter}>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Starting at</Text>
                  <Text style={styles.priceText}>{service.price}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {filteredServices.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔍</Text>
            <Text style={styles.emptyStateText}>No services found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search criteria
            </Text>
          </View>
        )}
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
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FECACA',
  },
  profileIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    marginTop: 5,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  serviceImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceIcon: {
    fontSize: 60,
  },
  serviceContent: {
    padding: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  serviceTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  serviceMetadata: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metadataText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  bookButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 15,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});