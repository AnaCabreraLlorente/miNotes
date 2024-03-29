import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formContainer: {
        width: 300,
        height: 300,
        marginTop: 20,
        marginLeft: 30,
        fontFamily: 'Arial',
        backgroundColor: '#D7E8EC',
        borderRadius: 10,
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
        marginTop: 50,
        width: 210,
        height: 210,
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: 30,
    }
});

export default styles;
