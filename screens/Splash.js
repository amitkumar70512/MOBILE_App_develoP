import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/core'
const Splash = () =>{
    const navigation = useNavigation()
    return(
<View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}
            >
                <LottieView
                    source={require('../assets/splash.json')}
                    autoPlay
                    loop={false}
                    speed={1}
                    onAnimationFinish={() => {
                        
                        navigation.replace('Login');
                    }}
                />
            </View>
    )
}
export default Splash