import { useNavigation, Route  } from '@react-navigation/core'
import React, { Component, useEffect, useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View , Image, Alert} from 'react-native'
import { auth } from '../firebase'
import { db } from '../firebase'
import { collection, query, where, getDocs ,getDoc,doc, setDoc} from 'firebase/firestore/lite';

import { FlatList,StatusBar } from 'react-native'
// import ReactDOM from "react-dom";
  
const ListStatus = () => { 
    console.log("displaying liststatus");
const [myobjectarray, setmyobjectarray] = useState([])

 useEffect(async()=>{
  var find_class=[];
  var k;
  var class_std;
  const find= await getDocs(collection(db,"students_list"));
  find.forEach((doc)=>{
    find_class.push(doc.id);
  });
  for(k=0;k<find_class.length;k++){
    const find1= await getDoc(doc(db,"students_list",find_class[k],"list",auth.currentUser?.email));
    if (find1.exists()){
    class_std=find_class[k];
    break;}
    else continue;
  }
  


//   var total_array=[],subject_array=[];
//   const totalsnap =await getDocs(collection(db, "students_list", class_std,"total_classes"));
//   totalsnap.forEach((doc)=>{
//     subject_array.push(doc.id);
//     total_array.push(doc.data().total);
//     count++;
//     console.log(doc.id);
//     console.log(doc.data().total);
//   })
 
 var temp=[];
 var count=0;
  const docRef = doc(db, "students_list",class_std,"list",auth.currentUser?.email);
    const docSnap = await getDoc(docRef);

   if (docSnap.exists()) {
    const print_att= await getDocs(collection(db,"students_list", class_std,"list",auth.currentUser?.email,"Attendance_status"));
    print_att.forEach((doc)=>{
        console.log("entered");
        // var percentage=0 ;
        // var i;
        // for(i=0;i<count;i++)
        // {
            // if(subject_array[i]==doc.id){
                // percentage=(doc.data().total/total_array[i])*100;
                temp.push({subject:doc.id,number:doc.data().total});
                // console.log("percentage")
                // console.log(subject_array[i]);
                // console.log(percentage);
                // break;
            // }
            
        // }
        
    });
    setmyobjectarray(temp);
        

    } else {
    // doc.data() will be undefined in this case
    alert("You dont belong to this class");
    navigation.navigate("List");

    }
    
  },[])
  

  

return(
    
  <View style={styles.container}>
      <Image 
          style={{ marginTop: 70 ,width:200, 
            height:200,}}
          source={require('../assets/liststatus.png')}
          
          />
            <Text style={styles.text}>
              Your current Attendance Status :
            </Text>
            
           
    <FlatList 
    data={myobjectarray}
    renderItem={({item})=>
    <TouchableOpacity >
        <View style={styles.button}>
          <Text style={styles.buttonText} >
            {item.subject} : {item.number}
          </Text>
        </View>
      </TouchableOpacity>
    }
    keyExtractor={(item, index) => index.toString()}
    />
  </View>
)


}

export default ListStatus

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
 
  
  button: {
    marginTop: 20 ,
    backgroundColor: '#03989E',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width:"100%",
  },
  
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  text:{
      paddingTop:25,
    fontWeight: 'bold',
    fontSize: 20,
    color:"#03989E",
  }
 
})