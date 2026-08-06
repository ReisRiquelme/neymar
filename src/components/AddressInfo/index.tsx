import React from 'react';
import { View, Text } from 'react-native';
import { ViaCEPResponse } from '../../types/cep';
import { styles } from './styles';

interface AddressInfoProps {
  address: ViaCEPResponse | null;
  notFound: boolean;
}

export function AddressInfo({ address, notFound }: AddressInfoProps) {
  // CA04: nada é renderizado se nenhum CEP foi consultado ainda
  if (!address && !notFound) {
    return null;
  }

  if (notFound) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          CEP não encontrado. Verifique o número digitado.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cepTitle}>CEP: {address?.cep}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Rua:</Text>
        <Text style={styles.value}>{address?.logradouro || '-'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Bairro:</Text>
        <Text style={styles.value}>{address?.bairro || '-'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Cidade:</Text>
        <Text style={styles.value}>{address?.localidade || '-'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>UF:</Text>
        <Text style={styles.value}>{address?.uf || '-'}</Text>
      </View>

      {!!address?.complemento && (
        <View style={styles.row}>
          <Text style={styles.label}>Complemento:</Text>
          <Text style={styles.value}>{address.complemento}</Text>
        </View>
      )}
    </View>
  );
}