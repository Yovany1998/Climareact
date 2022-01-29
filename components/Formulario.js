import React, {useState} from 'react';
import { Text,View,TextInput,StyleSheet,Animated, TouchableNativeFeedback, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {

    const {pais, ciudad} = busqueda;
    const [animacionboton] = useState(new Animated.Value(1));

    
    const consultarClima = () =>{
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return;
        }
        //consultar la Api
        guardarConsultar(true);
    }

    const mostrarAlerta = () =>{
        Alert.alert(
            'Error',
            'Agrega una ciudad y pais para la busqueda',
            [{text: 'Entendido'}]
        )
    }
    const animacionEntrada = () =>{
        Animated.spring(animacionboton,{
            toValue:.75,
            useNativeDriver: true
        }).start();

    }
    const animacionSalida = () =>{
        Animated.spring(animacionboton,{
            toValue:1,
            friccion: 4,
            tension: 30,
            useNativeDriver: true
         
        }).start();

    }

    const estiloAnimacion ={
        transform: [{scale: animacionboton}]

    }
    return (
        <>
        <View style={styles.formulario}>
            <View>
                <TextInput
                value={ciudad}
                style={styles.input}
                onChangeText={ciudad => guardarBusqueda({...busqueda , ciudad})}
                placeholder='Ciudad'
                placeholderTextColor={'#6666'}
                />
            </View>
            <View>
                <Picker
                selectedValue={pais}
                style={styles.picker}
                onValueChange={pais => guardarBusqueda({...busqueda, pais})}
                >
                <Picker.Item label="--Seleccione un pais--" value=""/>
                    <Picker.Item label="Estados Unidos" value="US"/>
                    <Picker.Item label="Argentina" value="AR"/>
                    <Picker.Item label="Mexico" value="MX"/>
                    <Picker.Item label="Colombia" value="CO"/>
                    <Picker.Item label="Costa Rica" value="CR"/>
                    <Picker.Item label="España" value="ES"/>
                    <Picker.Item label="Peru" value="PE"/>
                </Picker>               
                
            </View>
            <TouchableNativeFeedback
            onPressIn={() => animacionEntrada()}
            onPressOut={() => animacionSalida()}
            onPress={() => consultarClima()}
            >
                <Animated.View
                style={[styles.btnBucar, estiloAnimacion]}
                >
                    <Text style={styles.textoBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableNativeFeedback>
        </View>
        </>
    )
    };

const styles = StyleSheet.create({
    formulario:{

    },
    input:{
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        color: '#000',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    picker:{
        height: 120, 
        backgroundColor: '#FFF',
        color: '#000'
    },
    btnBucar:{
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar:{
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})
export default Formulario;
