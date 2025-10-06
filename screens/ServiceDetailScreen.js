import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function ServiceDetailScreen({ route, navigation }) {
  const { service } = route.params;
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const subscriptions = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '$99/month',
      features: ['5 hours/month', 'Basic support', 'Standard materials'],
      popular: false,
    },
    {
      id: 2,
      name: 'Professional Plan',
      price: '$199/month',
      features: ['15 hours/month', 'Priority support', 'Premium materials', 'Rush delivery'],
      popular: true,
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      price: '$399/month',
      features: ['Unlimited hours', '24/7 support', 'Custom materials', 'Dedicated team'],
      popular: false,
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'John Smith',
      rating: 5,
      comment: 'Excellent service! The quality exceeded my expectations.',
      date: '2 days ago',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 4,
      comment: 'Very professional team and fast delivery.',
      date: '1 week ago',
    },
    {
      id: 3,
      name: 'Mike Wilson',
      rating: 5,
      comment: 'Outstanding workmanship and great communication.',
      date: '2 weeks ago',
    },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Missing Information', 'Please select date and time');
      return;
    }
    Alert.alert('Booking Confirmed', `Your ${service.title} appointment is scheduled for ${selectedDate} at ${selectedTime}`);
  };

  const handleSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    Alert.alert('Subscription Selected', `You've selected the ${subscription.name} for ${subscription.price}`);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>⚙️</Text>
        </View>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>JD</Text>
        </View>
      </View>

      <View style={styles.serviceImageContainer}>
        <Text style={styles.serviceImage}>{service.image}</Text>
        <View style={styles.heartIcon}>
          <Text style={styles.heartText}>❤️</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceCategory}>{service.category}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{renderStars(service.rating)}</Text>
            <Text style={styles.ratingText}>{service.rating} ({service.reviews} reviews)</Text>
          </View>
          <Text style={styles.price}>{service.price}</Text>
          <Text style={styles.duration}>Duration: {service.duration}</Text>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{service.description}</Text>
          <Text style={styles.detailedDescription}>
            Our {service.title.toLowerCase()} service provides professional-grade solutions with state-of-the-art equipment and experienced technicians. We ensure precision, quality, and timely delivery for all your manufacturing needs.
          </Text>
        </View>

        <View style={styles.subscriptionCard}>
          <Text style={styles.sectionTitle}>Subscription Plans</Text>
          {subscriptions.map((subscription) => (
            <TouchableOpacity
              key={subscription.id}
              style={[
                styles.subscriptionOption,
                selectedSubscription?.id === subscription.id && styles.subscriptionSelected,
                subscription.popular && styles.popularSubscription
              ]}
              onPress={() => handleSubscription(subscription)}
            >
              {subscription.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>POPULAR</Text>
                </View>
              )}
              <Text style={styles.subscriptionName}>{subscription.name}</Text>
              <Text style={styles.subscriptionPrice}>{subscription.price}</Text>
              {subscription.features.map((feature, index) => (
                <Text key={index} style={styles.subscriptionFeature}>• {feature}</Text>
              ))}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bookingCard}>
          <Text style={styles.sectionTitle}>Book Appointment</Text>
          <View style={styles.bookingForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Date</Text>
              <TouchableOpacity style={styles.dateButton}>
                <Text style={styles.dateButtonText}>{selectedDate || 'Choose Date'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Time</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeOption,
                      selectedTime === time && styles.timeOptionSelected
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeOptionText,
                      selectedTime === time && styles.timeOptionTextSelected
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.reviewsCard}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <Text style={styles.reviewRating}>{renderStars(review.rating)}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          ))}
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
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  serviceImageContainer: {
    height: 200,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  serviceImage: {
    fontSize: 80,
  },
  heartIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  heartText: {
    fontSize: 24,
  },
  content: {
    padding: 25,
    marginTop: -20,
  },
  serviceInfo: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  serviceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  serviceCategory: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    fontSize: 18,
    marginRight: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: '#6B7280',
  },
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 15,
  },
  detailedDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  subscriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  subscriptionOption: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  subscriptionSelected: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  popularSubscription: {
    borderColor: '#DC2626',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#DC2626',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subscriptionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  subscriptionPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 10,
  },
  subscriptionFeature: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  bookingForm: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  timeScroll: {
    marginBottom: 10,
  },
  timeOption: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeOptionSelected: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  timeOptionText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  timeOptionTextSelected: {
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#DC2626',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  reviewsCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  reviewRating: {
    fontSize: 14,
  },
  reviewComment: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
