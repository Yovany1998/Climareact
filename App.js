import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableNativeFeedback,
  Keyboard
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';


const App = () => {

const [busqueda,guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
});

const [consultar, guardarConsultar] =useState(false);
const [resultado, guardarResultado] = useState({});
const [bgcolor, guardarBgcolor] = useState('rgb(71, 149, 212)');

const { ciudad, pais } = busqueda;



useEffect(() =>{
  const consultarClima = async ()=>{
    if(consultar){
        const appId="f15f04838a68cb94a5c8e75807c999c1";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      try{
        const respuesta =await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false);

        //Modifica los colores de fondo
        const kelvin = 273.15;
        const{main} = resultado;
        const actual = main.temp - kelvin;

        if(actual < 10) {
          guardarBgcolor('rgb( 105, 108, 149 )');
        } else if(actual >= 10 && actual < 25) {
          guardarBgcolor('rgb(71, 149, 212)');
        } else {
          guardarBgcolor('rgb( 178, 28, 61)');
        }

      }catch(error){
        mostrarAlerta();
      }
    }
  }
  consultarClima();
},[consultar]);



  const ocultarTeclado = () =>{
    Keyboard.dismiss();
  }

  const bgColorApp ={
    backgroundColor : bgcolor
  }

  return (
  <>
  <TouchableNativeFeedback onPress={() => ocultarTeclado()}>
  <View style={[styles.app, bgColorApp]}>
      <View style={styles.contenido}>
        <Clima
        resultado={resultado}
        />
      <Formulario
      busqueda={busqueda}
      guardarBusqueda={guardarBusqueda}
      guardarConsultar={guardarConsultar}
      
      />
      </View>
  </View>

  </TouchableNativeFeedback>
 

  </>
  );
};

const styles = StyleSheet.create({
 app:{
   flex: 1,
   justifyContent: 'center',

 },
 contenido:{
    marginHorizontal: 20
 }
});

export default App;
