import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Navbar({ brandName, links }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.brand}>{brandName}</Text>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Text style={styles.menuButtonText}>{menuOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <View style={styles.menuList}>
          {links.map((link, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={() => alert(`Clicou em: ${link}`)}>
              <Text style={styles.menuItemText}>{link}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1f2937',
    paddingTop: 40,
  },
  navBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  brand: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 22,
  },
  menuList: {
    backgroundColor: '#374151',
    paddingVertical: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    color: '#d1d5db',
    fontSize: 16,
  },
});