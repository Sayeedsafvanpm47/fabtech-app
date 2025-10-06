import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('current');

  const currentBookings = [
    {
      id: 1,
      service: 'CNC Machining',
      image: '🔧',
      date: 'Oct 10, 2024',
      time: '2:00 PM',
      status: 'Confirmed',
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
      status: 'In Progress',
      price: '$320',
      rating: 4.7,
      floor: '1st Floor',
      room: 'B01',
    },
  ];

  const orderHistory = [
    {
      id: 1,
      service: '3D Printing',
      image: '🖨️',
      date: 'Oct 8, 2024',
      time: '10:00 AM',
      status: 'Completed',
      price: '$180',
      rating: 4.6,
      floor: '2nd Floor',
      room: 'A03',
    },
    {
      id: 2,
      service: 'Sheet Metal Work',
      image: '🔨',
      date: 'Oct 5, 2024',
      time: '1:00 PM',
      status: 'Completed',
      price: '$420',
      rating: 4.9,
      floor: '1st Floor',
      room: 'A01',
    },
    {
      id: 3,
      service: 'Assembly Services',
      image: '⚙️',
      date: 'Oct 2, 2024',
      time: '11:00 AM',
      status: 'Completed',
      price: '$290',
      rating: 4.5,
      floor: '2nd Floor',
      room: 'B02',
    },
    {
      id: 4,
      service: 'Design Consultation',
      image: '📐',
      date: 'Sep 28, 2024',
      time: '9:00 AM',
      status: 'Completed',
      price: '$150',
      rating: 4.8,
      floor: '3rd Floor',
      room: 'C01',
    },
  ];

  const bookingsToShow = activeTab === 'current' ? currentBookings : orderHistory;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>Track your manufacturing services</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'current' && styles.tabActive]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabText, activeTab === 'current' && styles.tabTextActive]}>
            Current Bookings
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{currentBookings.length}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            Order History
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{orderHistory.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <View style={styles.bookingsContainer}>
        {bookingsToShow.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            {/* Booking Header */}
            <View style={styles.bookingHeader}>
              <View style={styles.bookingImageContainer}>
                <Text style={styles.bookingImage}>{booking.image}</Text>
              </View>
              
              <View style={styles.bookingHeaderContent}>
                <Text style={styles.bookingService}>{booking.service}</Text>
                <Text style={styles.locationText}>
                  📍 {booking.floor} • Room {booking.room}
                </Text>
              </View>
              
              <View style={[
                styles.bookingStatusBadge,
                booking.status === 'Completed' && styles.statusCompleted,
                booking.status === 'In Progress' && styles.statusInProgress,
                booking.status === 'Confirmed' && styles.statusConfirmed,
              ]}>
                <Text style={[
                  styles.bookingStatusText,
                  booking.status === 'Completed' && styles.statusCompletedText,
                  booking.status === 'In Progress' && styles.statusInProgressText,
                  booking.status === 'Confirmed' && styles.statusConfirmedText,
                ]}>
                  {booking.status}
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.bookingDivider} />

            {/* Booking Details */}
            <View style={styles.bookingDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{booking.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>{booking.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Price</Text>
                <Text style={styles.detailValuePrice}>{booking.price}</Text>
              </View>
            </View>

            {/* Rating (for completed orders) */}
            {booking.status === 'Completed' && (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Your Rating:</Text>
                <Text style={styles.ratingValue}>⭐ {booking.rating}</Text>
              </View>
            )}

            {/* Action Buttons */}
            {activeTab === 'current' && (
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButtonSecondary}>
                  <Text style={styles.actionButtonSecondaryText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonPrimary}>
                  <Text style={styles.actionButtonPrimaryText}>Contact Support</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab === 'history' && (
              <TouchableOpacity style={styles.rebookButton}>
                <Text style={styles.rebookButtonText}>Book Again</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Empty State */}
        {bookingsToShow.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📋</Text>
            <Text style={styles.emptyStateText}>No bookings found</Text>
            <Text style={styles.emptyStateSubtext}>
              {activeTab === 'current' 
                ? 'You have no active bookings at the moment'
                : 'Your order history is empty'}
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
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FECACA',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#DC2626',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 8,
  },
  tabTextActive: {
    color: '#fff',
  },
  tabBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  bookingsContainer: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  bookingImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#DC2626',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bookingImage: {
    fontSize: 30,
  },
  bookingHeaderContent: {
    flex: 1,
  },
  bookingService: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 13,
    color: '#6B7280',
  },
  bookingStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bookingStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  statusCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusCompletedText: {
    color: '#065F46',
  },
  statusInProgress: {
    backgroundColor: '#FEF3C7',
  },
  statusInProgressText: {
    color: '#92400E',
  },
  statusConfirmed: {
    backgroundColor: '#DBEAFE',
  },
  statusConfirmedText: {
    color: '#1E40AF',
  },
  bookingDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 15,
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  detailValuePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#92400E',
    marginRight: 10,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonSecondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionButtonPrimary: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonPrimaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  rebookButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  rebookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
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