import { Alert, StyleSheet } from 'react-native';
import { blue100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const stylesHome = StyleSheet.create({
    buttonContainer: {
        borderRadius: 15,
        backgroundColor: '#39A7C6',
        fontWeight: 'bold',
        marginBottom: 10,
        width: 200, 
        marginLeft: 60,
        alignContent: 'center'
    },

    addButton: {
      position: 'absolute',
      right: 10,
      bottom: 30
    },

    container: {
        flex: 1,
        
      },

      noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#D7E8EC',
        // backgroundColor: '#D7E8EC'
        
      },

      noteText: {
        color: 'black',
      },

      noteTouchable: {
        flex: 1,
      },
      modalContainer: {
        flex: 1,
        alignItems: 'center'
    
      },
      modalContent: {
        width: '90%', // ajusta el ancho según sea necesario (80% del ancho de la pantalla)
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        height: '80%'
      },

      title:{
        marginLeft: 10
      },
    
      textInputMultiline: {
        height: 200, // ajusta la altura según sea necesario
        textAlignVertical: 'top', // comienza la escritura desde la parte superior
        marginLeft: 10
      },
});

export default stylesHome;