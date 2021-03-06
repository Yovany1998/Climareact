import React from 'react';
import {StyleSheet,View,Image,Text} from 'react-native';
import { normalizeRect } from 'react-native/Libraries/StyleSheet/Rect';

const Clima = ({resultado}) => {
const {name, main} = resultado;

if(!name) return null;

//grados kelvin
const kelvin = 273.15;
  return (
    <View style={styles.clima}>
        <Text style={[styles.texto, styles.actual]}
        >{parseInt(main.temp-kelvin)}
         {/* Grados celsius */}
         <Text style={styles.temperatura}>
                &#x2103;
            </Text>
            <Image
              style={{ width: 60, height: 55}}
              source={{uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
            />
        </Text>
           
           <View style={styles.temperaturas}>
             <Text style={styles.texto}> Min {''}
                <Text style={styles.temperatura}>
                  {parseInt(main.temp_min - kelvin)} &#x2103;
                </Text>
             </Text>

             <Text style={styles.texto}>Max {''}
                <Text style={styles.temperatura}>
                  {parseInt(main.temp_max - kelvin)} &#x2103;
                </Text>
             </Text>
           </View>
    </View>
  );
};

const styles = StyleSheet.create({
    clima:{
      marginBottom: 20
    },
    texto:{
      color: '#FFF',
      fontSize: 20,
      textAlign: 'center',
      marginRight: 20
    },
    actual:{
      	fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temperatura:{
      fontSize: 24,
      fontWeight:'bold'
    },
    temperaturas:{
      flexDirection: 'row',
      justifyContent: 'center'
    }
})
export default Clima;
