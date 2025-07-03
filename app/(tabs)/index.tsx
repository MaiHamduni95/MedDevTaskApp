
import { ThemedView } from '@/components/ThemedView';
import TreatmentListScreen from '@/screens/treatmentListscreen';

export default function HomeScreen() {
  return (
    <ThemedView style={{ backgroundColor: '#fff', flex: 1, padding: 16 }}> 
      <TreatmentListScreen/>
    </ThemedView>
  );
}
