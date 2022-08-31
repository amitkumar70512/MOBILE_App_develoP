import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View ,ImageBackground} from 'react-native'
import { exp } from 'react-native/Libraries/Animated/Easing'
import { iosocket  } from '../App'


const DemoScreen = ()=>{
    
  const [code, setCode] = useState('')
 const navigation = useNavigation()
  const goHomeHandler=()=>{
     console.log("inside go home handler");
    
    iosocket.emit('client_message',"i am from app side bro");
    
      if(code=="amit")
      {
        iosocket.emit('client)_messaage',"hi ur unique code has been matched , oowowwwooww");
      }
      else{
        iosocket.emit('client)_messaage',"no no dont type this ok");
      }
       iosocket.on('ServerEvent',(data)=>{
         console.log("receiving student details  from checkit server");
         
         console.log("data received ");
       })
     
    navigation.replace("QR");
  }

  return(
  
        <ImageBackground
        source={require('../assets/animated_bg.gif')}
        style={style.imagebg}>
        
        
        <TouchableOpacity
        onPress={goHomeHandler}
        style={style.touchbtn}
        >
          <Text
          style={style.btnText}>Back</Text>
        </TouchableOpacity>
        <TextInput
        placeholder="Enter Unique code"
        value={code}
        onChangeText={text => setCode(text)}
        style={style.input}/>
        </ImageBackground>
   
  )}
export default DemoScreen;
const style=StyleSheet.create({

imagebg:{
    flex:1,
},
touchbtn:{
  margin:20,
  backgroundColor:'#777',
 
  alignItems:'center',
  padding:10,
},
btnText:{
  color:'#03989E',
  
  fontSize:15,
  fontWeight:'bold',
},
input:{
  borderWidth:2,
  borderBottomColor:'#2B517F',
  backgroundColor:'#F5FCFB',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop: 5,
}
    
})