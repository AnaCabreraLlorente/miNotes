import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Keyboard, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesHome from '../style/styleHome';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';

const HomeScreen = ({ route, navigation }) => {
  const { userId } = route.params; // Assume you're passing the userId from the login screen
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
        const storedNotes = await AsyncStorage.getItem(`notes_${userId}`);
        if (storedNotes) {
          const parsedNotes = JSON.parse(storedNotes);
          setNotes(parsedNotes);
        }
      } catch (error) {
        console.error('Error loading notes from AsyncStorage:', error);
      }
    };

    loadNotes();
  }, [userId]);

  const handleAddOrEditNote = async () => {
    if (!editingNote.title.trim()) {
      return; // Avoid empty notes
    }

    const updatedNotes = editingNote.id
      ? notes.map((note) => (note.id === editingNote.id ? editingNote : note))
      : [...notes, { ...editingNote, id: uuidv4() }];

    try {
      await AsyncStorage.setItem(`notes_${userId}`, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setEditingNote({ title: '', text: '' });
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving note to AsyncStorage:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    try {
      await AsyncStorage.setItem(`notes_${userId}`, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setEditingNote({ title: '', text: '' });
      setModalVisible(false);
      ToastAndroid.showWithGravity('Nota eliminada', ToastAndroid.SHORT, ToastAndroid.CENTER);
    } catch (error) {
      console.error('Error deleting note from AsyncStorage:', error);
    }
  };

  const handleNotePress = (note) => {
    setEditingNote(note);
    setModalVisible(true);
  };

  const clearStoredData = async () => {
    try {
      // Clear all data stored in AsyncStorage for the current user
      await AsyncStorage.removeItem(`notes_${userId}`);
      console.log('All data in AsyncStorage for the user has been cleared.');
    } catch (error) {
      console.error('Error clearing all data in AsyncStorage:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={stylesHome.noteItem}>
      <TouchableOpacity
        onPress={() => handleNotePress(item)}
        style={stylesHome.noteTouchable}
      >
        <Text style={stylesHome.noteText}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
        <Icon name="delete" size={20} color="#39A7C6" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={stylesHome.container}>
      <FlatList style={stylesHome.flatList}
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={stylesHome.addButton} onPress={() => {setEditingNote({title: '', text: ''}); setModalVisible(true)} }>
        <Icon name="pluscircle" size={50} color="#39A7C6"/>
      </TouchableOpacity>

      {/* Modal to add a new note or edit the selected note */}
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
