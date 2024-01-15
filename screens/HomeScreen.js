import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Keyboard } from 'react-native';
import { FAB, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesHome from '../style/styleHome';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const iconName = 'plus';
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState({ title: '', text: '' });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          const parsedNotes = JSON.parse(storedNotes);
          setNotes(parsedNotes);
        }
      } catch (error) {
        console.error('Error al cargar notas desde AsyncStorage:', error);
      }
    };

    loadNotes();
  }, []);

  const handleAddOrEditNote = async () => {
    if (!editingNote.title.trim()) {
      return; // Evitar notas vacías
    }

    const updatedNotes = editingNote.id
      ? notes.map((note) => (note.id === editingNote.id ? editingNote : note))
      : [...notes, { ...editingNote, id: String(Date.now()) }];

    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setEditingNote({ title: '', text: '' });
      setModalVisible(false);
    } catch (error) {
      console.error('Error al guardar nota en AsyncStorage:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setEditingNote({ title: '', text: '' });
      setModalVisible(false);
    } catch (error) {
      console.error('Error al eliminar nota en AsyncStorage:', error);
    }
  };

  const handleNotePress = (note) => {
    setEditingNote(note);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={stylesHome.noteItem}>
      <TouchableOpacity
        onPress={() => handleNotePress(item)}
        style={stylesHome.noteTouchable}
      >
        <Text>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
        <Icon name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={stylesHome.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={stylesHome.fab}
        icon={({ size, color }) => (
            <Icon name={iconName} size={size} color={color} />
          )}
        onPress={() => {
          setEditingNote({ title: '', text: '' });
          setModalVisible(true);
        }}
      />

      {/* Modal para añadir nueva nota o editar la nota seleccionada */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setEditingNote({ title: '', text: '' });
          setModalVisible(false);
        }}
      >
        <View style={stylesHome.modalContainer}>
          <View style={stylesHome.modalContent}>
            <TextInput
              placeholder="Título"
              value={editingNote.title}
              onChangeText={(text) => setEditingNote({ ...editingNote, title: text })}
              style={stylesHome.title}
            />
            <TextInput
              placeholder="Texto"
              value={editingNote.text}
              onChangeText={(text) => setEditingNote({ ...editingNote, text: text })}
              multiline={true}
              style={[stylesHome.textInputMultiline, , { height: isKeyboardOpen ? '60%' : '70%' }]}
            />
            <Button onPress={handleAddOrEditNote} style={stylesHome.buttonContainer} labelStyle={{ color: 'white' }}>Guardar</Button>
            <Button onPress={() => setModalVisible(false)} style={stylesHome.buttonContainer} labelStyle={{ color: 'white' }}>Cancelar</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
