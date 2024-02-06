import { StyleSheet } from 'react-native';

const stylesRegister = StyleSheet.create({
    formContainer: {
        width: 300,
        height: 300,
        marginTop: 200,
        marginLeft: 30,
        fontFamily: 'Arial',
        backgroundColor: '#D7E8EC',
        borderRadius: 10
    },
    input: {
        marginLeft: 30,
        marginRight: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        borderBottomWidth: 1,
        borderColor: 'gray',
        textAlignVertical: 'bottom'
    },

    text: {
        textAlign: 'center',
        textDecorationLine: 'underline'
    },

    backgroundImage: {
        height: 800
    },

    buttonContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: '#39A7C6',
        fontWeight: 'bold',
        marginBottom: 15
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        color: '#2c3e50',
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#34495e',
        textAlign: 'center',
    },
    portada:{
        width: 360,
        height: 280,
        borderRadius: 10,
   
    }
});

export default stylesRegister;
