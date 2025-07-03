import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Alert } from 'react-native';
import TreatmentForm from '../../components/treatment/treatmentform';
import { addTreatment } from '../../services/api';

export default function ExploreScreen() {
  const handleAddTreatment = async (formData: any) => {
    try {
      await addTreatment(formData);
      Alert.alert('✅ Success', 'Treatment added successfully');
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to add treatment');
    }
  };

  return (
    <ThemedView  style={{ backgroundColor: '#fff', flex: 1, padding: 16 }}>
      <TreatmentForm onSubmit={handleAddTreatment} />
    </ThemedView>
  );
}
