import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

const TreatmentForm = ({ onSubmit }) => {
  const [patientName, setPatientName] = useState('');
  const [treatmentType, setTreatmentType] = useState('Physiotherapy');
  const [treatmentDate, setTreatmentDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState('date');

  const handleSubmit = () => {
    if (!patientName || !treatmentType || !treatmentDate) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    onSubmit({
      patientName,
      treatmentType,
      treatmentDate: treatmentDate.toISOString(),
      notes,
    });

    setPatientName('');
    setNotes('');
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }

    if (mode === 'date') {
      const currentDate = selectedDate || treatmentDate;
      setTreatmentDate((prev) => {
        const updated = new Date(currentDate);
        updated.setHours(prev.getHours());
        updated.setMinutes(prev.getMinutes());
        return updated;
      });

      setMode('time');
      setShowDatePicker(true); // show time picker next
    } else {
      const currentTime = selectedDate || treatmentDate;
      setTreatmentDate((prev) => {
        const updated = new Date(prev);
        updated.setHours(currentTime.getHours());
        updated.setMinutes(currentTime.getMinutes());
        return updated;
      });

      setShowDatePicker(false);
      setMode('date'); // reset for next open
    }
  };

  const openDateTimePicker = () => {
    setMode('date');
    setShowDatePicker(true);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.form}>
        <Text>Patient Name</Text>
        <TextInput
          value={patientName}
          onChangeText={setPatientName}
          style={styles.input}
          placeholder="Enter name"
        />

        <Text>Treatment Type</Text>
        <Picker
          selectedValue={treatmentType}
          onValueChange={setTreatmentType}
          style={styles.input}
        >
          <Picker.Item label="Physiotherapy" value="Physiotherapy" />
          <Picker.Item label="Ultrasound" value="Ultrasound" />
          <Picker.Item label="Stimulation" value="Stimulation" />
        </Picker>

        <Text>Treatment Date & Time</Text>
        <TextInput
          value={treatmentDate.toLocaleString()}
          style={styles.input}
          editable={false}
          onFocus={openDateTimePicker}
        />

        {showDatePicker && (
          <DateTimePicker
            value={treatmentDate}
            mode={mode}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onChange}
          />
        )}

        <Text>Notes</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Optional notes"
        />

        <Button title="Add Treatment" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: '#f9f9f9',
    paddingVertical: 32,
  },
  form: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      },
      default: {},
    }),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
});

export default TreatmentForm;