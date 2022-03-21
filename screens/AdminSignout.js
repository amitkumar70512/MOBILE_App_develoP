import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View , Image} from 'react-native'
import { auth } from '../firebase'
import {db } from '../firebase'
import { collection, query, where, getDocs ,getDoc} from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore"; 

const AdminSignout = () => {
  const [adminkey, setAdmin] = useState('')
  
  const navigation = useNavigation()

  const handleSignOut = () => {

    if(adminkey=="123456"){


        auth
        .signOut()
        .then(() => {
          navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }
    else{
        alert(`INCORRECT ADMIN KEY`);
    }

  }

 

  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Image 
          style={{width:150, height:150}}
          source={require('../assets/checkit_logo.png')}
          
          />
      <View style={styles.inputContainer}>
      
     
        <TextInput
          placeholder="adminkey"
          value={adminkey}
          onChangeText={text => setAdmin(text)}
          style={styles.input}
          secureTextEntry
        />
        
      </View>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default AdminSignout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonContainer: {
   
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    marginTop: 20 ,
    backgroundColor: '#03989E',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#03989E',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#03989E',
    fontWeight: '700',
    fontSize: 16,
  },
})