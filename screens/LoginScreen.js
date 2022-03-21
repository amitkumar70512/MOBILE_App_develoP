import { useNavigation } from '@react-navigation/core'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View , Image,Alert} from 'react-native'
import { auth } from '../firebase'
import { db } from '../firebase'
import { collection, query, where, getDocs ,getDoc,doc, setDoc } from 'firebase/firestore/lite';
import { increment, updateDoc,update} from 'firebase/firestore'
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

const LoginScreen = () => {
  
    
    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminkey, setAdmin] = useState('')
  // const [username, setUsername] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
 if(adminkey=="123456"){
  auth
  .createUserWithEmailAndPassword(email, password)
  .then(userCredentials => {
    const user = userCredentials.user;
    console.log('Registered with:', user.email);
  })
  .catch(error => Alert.alert('Error',error.message,[
    {text:'Fine'}
  ]))

    }
    else{
        Alert.alert('OOPS!','Invalid admin key',[
          {text:'Understood'}
    ]);
    }
  }


  const handleDemo = () => {
   

    if(adminkey=="123456"){
        navigation.replace("Demo")
        }
        else{
          Alert.alert('OOPS!','Invalid admin key',[
            {text:'Understood'}
      ]);
        }

    
}  
  

  const handleLogin = () => {
   

      if(adminkey=="123456"){
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
        })
        .catch(error => Alert.alert('Error',error.message,[
          {text:'Try again'}
        ]))
          }
          else{
            Alert.alert('OOPS!','Invalid admin key',[
              {text:'Understood'}
        ]);
          }

      
  }

  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Image 
          style={{width:150, height:150}}
          source={require('../assets/checkit_gif.gif')}
          
          />
      
      <View style={styles.inputContainer}>
      
     
        <TextInput
          placeholder="adminkey"
          value={adminkey}
          onChangeText={text => setAdmin(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleDemo}
        style={styles.button}>
          <Text style={styles.buttonText}>demo screen</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
    borderBottomColor:'#2B517F',
    borderWidth:3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#03989E',
    width: '100%',
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