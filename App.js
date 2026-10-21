import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Navbar from './src/components/Navbar';

export default function App() {
  const navLinks = ['Home', 'Projetos', 'Sobre', 'Contato'];

  return (
    <SafeAreaView style={styles.container}>
      <Navbar brandName="DevPortfolio" links={navLinks} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});