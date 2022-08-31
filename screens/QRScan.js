import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, TextInput, TouchableOpacity , Image} from 'react-native'
import { auth } from '../firebase'
import { db } from '../firebase'
import { doc, collection, query, where, getDoc, getDocs ,setDoc} from "firebase/firestore/lite";
import { iosocket } from '../App';
import { USN } from '../App';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    TouchableHighlight,
    Alert,
    StatusBar as RnStatusBar,
  } from 'react-native';

  const QRScan = () => {
    
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation()
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    ///

    const handleBarCode = async ({ type, data }) => {
      setScanned(true);
      console.log(data);
      
      var id=iosocket.io.engine.id;
        const obj={id:id,key:data,usn:USN};/// object is created to send it ot server using iosockets
        iosocket.emit('client_attendance',obj);// obj is sent to server
        
        alert('qr scanned successfully');
        navigation.replace("Demo");
    };

    ///

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        console.log(data);
        const obj={data:data,name:'amitkumar',usn:'1bm19cs015'}
        iosocket.emit('client_attendance',obj);
          const q_snapshot = await getDoc(doc(db,'QR_key',data));
              if(q_snapshot.exists()){
                if(q_snapshot.data().valid=="1"){
                var teacher_usn=q_snapshot.data().teacher_USN;
                var section=q_snapshot.data().section;
                var subject=q_snapshot.data().class;
                var date= q_snapshot.data().date;
                console.log(teacher_usn);
                console.log(section);
                console.log(subject);
                console.log(auth.currentUser?.email); 
                const stud_usn_query= await getDoc(doc(db,"students_list",section,"list",auth.currentUser?.email));
                var stud_usn= stud_usn_query.data().usn;
                const docRef = doc(db,'Attendance',teacher_usn,section,date,"attended",stud_usn);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  alert("Attendance already given");
                  }
                  else{
                    //give attendance
                    // let me use socket to notify server abt myself, that im present
                    
                    await setDoc(doc(db,'Attendance',teacher_usn,section,date,"attended",stud_usn),{
                      
                    });
                    alert(`ATTENDANCE GIVEN`);
                    const q1=await getDoc(doc(db, "students_list",section,"list",auth.currentUser?.email,"Attendance_status",subject));
                var a=q1.data().total;
                a++;
                await setDoc(doc(db, "students_list",section,"list",auth.currentUser?.email,"Attendance_status",subject),{
                  total:a
                });
                console.log("student class count given,attendance given");
                
                  }
                
                
                //classes count student has attended


                }
              }
            else{
                console.log("wrong qr")
                alert("Invalid QR code,scan again")
            }


              
        navigation.replace("Home")
      };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
    
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCode}
            style={StyleSheet.absoluteFillObject}
          />
         
        </View>
      );
    }
  export default QRScan

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });

  // const handleSignUp = async () => {
    
  //   //read
  //   const users_collection =collection(db,'faculty');
  //   const users_snapshot = await getDocs(users_collection);
  //   const users_list= users_snapshot.docs.map(doc => doc.data());
  //   console.log(users_list);
  //     //write
    // const data="hello";
    // await setDoc(doc(db,"QR_key",data),{
    //    name:"hi"
    // });

  // }