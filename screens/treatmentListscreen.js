import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { deleteTreatment, getTreatments } from '../services/api';

const TreatmentListScreen = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTreatments = async () => {
    try {
      const res = await getTreatments();
      const ids = res.data.map(t => t.id);
      console.log('Treatment IDs:', ids);

      setTreatments(res.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch treatments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTreatments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTreatment(id);
      setTreatments(treatments.filter((t) => t.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete treatment');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.patientName}</Text>
      <Text>Type: {item.treatmentType}</Text>
      <Text>Date: {item.treatmentDate}</Text>
      {item.notes ? <Text>Notes: {item.notes}</Text> : null}
      <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <FlatList
          data={treatments}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          ListEmptyComponent={<Text>No treatments found.</Text>}
        />
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
    backgroundColor: '#fff',
    paddingVertical: 32,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 600, // Responsive max width for desktop/web
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      },
      default: {},
    }),
  },
  container: {
    padding: 24,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    ...Platform.select({
      web: {
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      },
      default: {},
    }),
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TreatmentListScreen;