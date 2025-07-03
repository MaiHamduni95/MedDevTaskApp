import { useRef } from 'react';
import { Alert, View } from 'react-native';
import TreatmentForm from '../components/TreatmentForm';
import { addTreatment, getTreatments } from '../services/api';

const AddTreatmentScreen = () => {
  const formRef = useRef();

  const handleAdd = async (formData) => {
    try {
      const { patientName, treatmentType, treatmentDate } = formData;
      const submittedDate = new Date(treatmentDate).toISOString().split('T')[0];
      const { data: existingTreatments } = await getTreatments();

      const isDuplicate = existingTreatments.some(
        (t) =>
          t.patientName === patientName &&
          t.treatmentType === treatmentType &&
          new Date(t.treatmentDate).toISOString().split('T')[0] === submittedDate
      );

      if (isDuplicate) {
        await new Promise((resolve) =>
          Alert.alert(
            'Duplicate Detected',
            'This treatment already exists for the patient on the same date.',
            [{ text: 'OK', onPress: resolve }]
          )
        );
        return;
      }

      await addTreatment(formData);

      await new Promise((resolve) =>
        Alert.alert('Success', 'Treatment added successfully', [
          { text: 'OK', onPress: resolve },
        ])
      );

      formRef.current?.resetForm();
    } catch (error) {
      console.log('❌ Backend error:', error?.response || error.message);

      const backendMessage =
        error?.response?.data?.error ||
        error?.message ||
        'Failed to add treatment';

      await new Promise((resolve) =>
        Alert.alert('Error', backendMessage, [{ text: 'OK', onPress: resolve }])
      );
    }
  };

  return (
    <View>
      <TreatmentForm ref={formRef} onSubmit={handleAdd} />
    </View>
  );
};

export default AddTreatmentScreen;