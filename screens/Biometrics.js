import { useNavigation } from '@react-navigation/core'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button, Image,
  TouchableHighlight,
  Alert,
  StatusBar as RnStatusBar,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { auth } from '../firebase'
import { KeyboardAvoidingView } from 'react-native-web';

const Biometrics = () => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
          const compatible = await LocalAuthentication.hasHardwareAsync();
          setIsBiometricSupported(compatible);
        })();
      });

      const fallBackToDefaultAuth = () => {
       
        console.log('fall back to password authentication');
      };
    
      const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
          {
            text: btnTxt,
            onPress: btnFunc,
          },
        ]);
      };
    
      const handleBiometricAuth = async () => {
        // Check if hardware supports biometrics
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    
        // Fallback to default authentication method (password) if Fingerprint is not available
        if (!isBiometricAvailable)
          return alertComponent(
            'Please enter your password',
            'Biometric Authentication not supported',
            'OK',
            () => fallBackToDefaultAuth()
          );
    
        // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
        let supportedBiometrics;
        if (isBiometricAvailable)
          supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
           console.log(supportedBiometrics)
        // Check Biometrics are saved locally in user's device
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        console.log(savedBiometrics);
        if (!savedBiometrics)
          return alertComponent(
            'Biometric record not found',
            'Please login with your password',
            'OK',
            () => fallBackToDefaultAuth()
          );
    
        // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)
    
        const biometricAuth = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Login with Biometrics',
          cancelLabel: 'Cancel',
          disableDeviceFallback: true,
        });
        // Log the user in on success
        if (biometricAuth.success== true)
        {
            console.log('success');
            navigation.replace("QR")
    }
    
        console.log({ isBiometricAvailable });
        console.log({ supportedBiometrics });
        console.log({ savedBiometrics });
        console.log({ biometricAuth });

      };
      return (
        <SafeAreaView>
           
          <View  behavior='padding' style={styles.image}>
          <Image 
          style={styles.image}
          source={require('../assets/biopic.png')}
          
          
          />
          </View>
            <View style={styles.container}>
            <Text>
              {isBiometricSupported
                ? 'Your device is compatible with Biometrics'
                : 'Face or Fingerprint scanner is available on this device'}
            </Text>
    
            
            
            <TouchableHighlight
              style={{
                height: 60,
              }}
            >
              <Button
                title="Click to launch scanner"
                color="#03989E"
                
                onPress={handleBiometricAuth}
              />
            </TouchableHighlight>
    
            
          </View>
        </SafeAreaView>
      );
    }
    export default Biometrics

    const styles = StyleSheet.create({
        container: {
          paddingTop: 300,
          flex: 1,
          paddingLeft:15,
          paddingRight: 15,
          
          justifyContent: 'center'
        },
        button: {
          backgroundColor: '#03989E',
          width: '60%',
          paddingLeft: 15,
        
          paddingBottom: 30,
          alignItems: 'center',
          marginTop: 40,
          position: 'absolute',
        },
        image:{
          width:200,
          height:200,
          borderRadius: 10,
          paddingTop: 170,
          paddingBottom:70,
          alignSelf:'center',
        }
        
      });