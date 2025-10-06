import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { supabaseService } from '../config/supabase-simple';
import { useAuth } from '../contexts/AuthContext';

export default function BookingsScreen() {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('current');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load bookings from Supabase
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      if (!user) {
        setBookings([]);
        return;
      }
      
      const data = await supabaseService.getBookings(user.id);
      setBookings(data || []);
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Failed to load bookings');
      // Fallback to local data
      setBookings(getMockBookings());
    } finally {
      setLoading(false);
    }
  };

  const getMockBookings = () => [
    {
      id: 1,
      service: 'CNC Machining',
      image: '🔧',
      date: 'Oct 10, 2024',
      time: '2:00 PM',
      status: 'confirmed',
      price: '$250',
      rating: 4.8,
      floor: '2nd Floor',
      room: 'A02',
    },
    {
      id: 2,
      service: 'Welding Services',
      image: '⚡',
      date: 'Oct 12, 2024',
      time: '3:00 PM',
      status: 'in-progress',
      price: '$320',
      rating: 4.7,
      floor: '1st Floor',
      room: 'B01',
    },
    {
      id: 3,
      service: '3D Printing',
      image: '🖨️',
      date: 'Oct 8, 2024',
      time: '10:00 AM',
      status: 'completed',
      price: '$180',
      rating: 4.6,
      floor: '2nd Floor',
      room: 'A03',
    },
    {
      id: 4,
      service: 'Sheet Metal Work',
      image: '🔨',
      date: 'Oct 5, 2024',
      time: '1:00 PM',
      status: 'completed',
      price: '$420',
      rating: 4.9,
      floor: '1st Floor',
      room: 'A01',
    },
  ];

  // Filter bookings based on active tab
  const currentBookings = bookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'in-progress'
  );
  const orderHistory = bookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const bookingsToShow = activeTab === 'current' ? currentBookings : orderHistory;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#10B981';
      case 'in-progress':
        return '#F59E0B';
      case 'completed':
        return '#3B82F6';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'Confirmed';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      if (action === 'cancel') {
        await supabaseService.updateBooking(bookingId, { status: 'cancelled' });
        Alert.alert('Success', 'Booking cancelled successfully');
      } else if (action === 'reschedule') {
        Alert.alert('Reschedule', 'Reschedule functionality coming soon');
      }
      loadBookings(); // Reload bookings
    } catch (err) {
      console.error('Error updating booking:', err);
      Alert.alert('Error', 'Failed to update booking');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text style={styles.loadingText}>Loading bookings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadBookings}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>
              Hi, {userProfile?.name ? `Mr. ${userProfile.name.split(' ')[0]}` : 'User'}
            </Text>
          </View>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>
              {userProfile?.name 
                ? userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                : 'U'
              }
            </Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'current' && styles.activeTab]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
            Current Bookings
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{currentBookings.length}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Order History
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{orderHistory.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <View style={styles.content}>
        {bookingsToShow.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'current' ? 'No current bookings' : 'No order history'}
            </Text>
            <Text style={styles.emptySubtext}>
              {activeTab === 'current' 
                ? 'Your upcoming appointments will appear here' 
                : 'Your completed orders will appear here'
              }
            </Text>
          </View>
        ) : (
          bookingsToShow.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceIcon}>{booking.image}</Text>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.serviceName}>{booking.service}</Text>
                    <Text style={styles.bookingDateTime}>
                      {booking.date} • {booking.time}
                    </Text>
                    <Text style={styles.bookingLocation}>
                      {booking.floor} • Room {booking.room}
                    </Text>
                  </View>
                </View>
                <View style={styles.bookingStatus}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
                  </View>
                  <Text style={styles.bookingPrice}>{booking.price}</Text>
                </View>
              </View>
              
              <View style={styles.bookingFooter}>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingStars}>
                    {'⭐'.repeat(Math.floor(booking.rating))}
                  </Text>
                  <Text style={styles.ratingText}>{booking.rating}</Text>
                </View>
                
                {activeTab === 'current' && booking.status !== 'completed' && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleBookingAction(booking.id, 'reschedule')}
                    >
                      <Text style={styles.actionButtonText}>Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.cancelButton]}
                      onPress={() => handleBookingAction(booking.id, 'cancel')}
                    >
                      <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#DC2626',
    padding: 25,
    paddingTop: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 25,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  profileIcon: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileIconText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 25,
    marginTop: -20,
    borderRadius: 25,
    padding: 5,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#DC2626',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 8,
  },
  activeTabText: {
    color: '#fff',
  },
  tabBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 25,
    marginTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  serviceInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  serviceIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  bookingDateTime: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  bookingLocation: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bookingStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    fontSize: 14,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginLeft: 10,
    backgroundColor: '#F3F4F6',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  cancelButton: {
    backgroundColor: '#FEE2E2',
  },
  cancelButtonText: {
    color: '#DC2626',
  },
});
