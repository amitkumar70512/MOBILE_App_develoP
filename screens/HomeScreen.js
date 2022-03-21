import { useNavigation } from '@react-navigation/core'
import React ,{useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'
import { auth } from '../firebase'

const HomeScreen = () => {
    const [email, setEmail] = useState('')
    const navigation = useNavigation()
console.log("displaying homescreen1");

useEffect(()=>{
var email1=auth.currentUser?.email;
setEmail(email1)
},[])
  const handleSignOut = () => {
      
    navigation.navigate("Admin")
  }

  const handleAttendance = () => {
    
        navigation.navigate("Bio")
     
  }

  const checkAttendance = () => {
     
      navigation.navigate("ListStatus");
     
        
      
  }

  return (

    <View style={styles.container}>
      <Image 
          style={{width:150, height:150}}
          source={require('../assets/checkit_logo.png')}
          
          />
          
      <Text>{email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAttendance}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Give Attendance</Text>
      </TouchableOpacity>

      


      <TouchableOpacity
        onPress={checkAttendance}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Check Attendance</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#03989E',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})