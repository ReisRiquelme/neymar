import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
  errorContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FDE8E8',
  },
  errorText: {
    color: '#C0392B',
    fontSize: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    color: '#333333',
    width: 90,
  },
  value: {
    flex: 1,
    color: '#111111',
  },
  cepTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1A1A1A',
  },
});