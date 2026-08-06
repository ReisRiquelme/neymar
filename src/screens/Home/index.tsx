import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { api } from '../../services/api';
import { ViaCEPResponse } from '../../types/cep';
import { AddressInfo } from '../../components/AddressInfo';
import { styles } from './styles';

const CEP_LENGTH = 8;

export function Home() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<ViaCEPResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // CA01: aceita somente números e limita a 8 dígitos
  function handleChangeCep(text: string) {
    const onlyNumbers = text.replace(/[^0-9]/g, '').slice(0, CEP_LENGTH);
    setCep(onlyNumbers);
  }

  async function handleSearch() {
    // CA01: não dispara busca se o campo estiver incompleto ou vazio
    if (cep.length !== CEP_LENGTH) {
      return;
    }

    setLoading(true); // CA02: loading aparece imediatamente
    setAddress(null);
    setNotFound(false);
    setErrorMessage('');

    try {
      const response = await api.get<ViaCEPResponse>(`${cep}/json/`);

      if (response.data.erro) {
        // CEP com formato válido, mas inexistente na base do ViaCEP
        setNotFound(true);
      } else {
        setAddress(response.data);
      }
    } catch (error) {
      setErrorMessage('Não foi possível buscar o CEP. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false); // CA02: loading some somente após o processamento total
    }
  }

  const isButtonDisabled = loading || cep.length !== CEP_LENGTH;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consulta de CEP</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          keyboardType="numeric"
          maxLength={CEP_LENGTH}
          value={cep}
          onChangeText={handleChangeCep}
          editable={!loading}
        />

        {/* CA03: botão desabilitado durante o carregamento */}
        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={handleSearch}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {cep.length > 0 && cep.length < CEP_LENGTH && (
        <Text style={styles.helperText}>Digite os 8 dígitos do CEP.</Text>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E86DE" />
        </View>
      )}

      {!!errorMessage && (
        <Text style={[styles.helperText, { color: '#C0392B', textAlign: 'center', marginTop: 16 }]}>
          {errorMessage}
        </Text>
      )}

      {!loading && <AddressInfo address={address} notFound={notFound} />}
    </SafeAreaView>
  );
}