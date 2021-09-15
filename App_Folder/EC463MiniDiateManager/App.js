import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Food from './Mini_Back/food.js';
import FoodEntry from './Mini_Back/food_entry.js';
import Meal from './Mini_Back/meal.js';
import NutritionForm from "./Mini_Back/nutrition_form.js";
import DayTakeIn from './Mini_Back/day_takein.js';
import TestingSC from './Mini_Back/test.js';


import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// Import Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import { Appbar } from 'react-native-paper';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userStorage, setUserStorage] = useState(null);
  const [backEnd, setBackEnd] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [backEndLoaded, setBackEndLoaded] = useState(false);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      webClientId: '618239383022-fogd500apr628f3ju41o47k96iuil6m9.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      _getCurrentUserInfo();
      _load_BackEnd(this.userInfo);
    }
    setGettingLoginStatus(false);
  };

  const _load_BackEnd = (Info) => {
    console.log("KKKKK"+Info);
    const temp = new DayTakeIn();
    if (typeof Info !== "undefined"){
      firestore().collection(Info.user.id).get().then(snapshot => {
      snapshot.forEach(doc => {
          if(doc.id == "DiateLog"){
              console.log(doc.data().test_day);
              temp.copy(doc.data().test_day);
              setBackEnd(temp);
              console.log("{{{{{{"+temp);
              setBackEndLoaded(true);
          }
        });
    });}
  };

  const _getCurrentUserInfo = async () => {
    let info = await GoogleSignin.signInSilently();
    setUserInfo(info);
    _load_BackEnd(info);
    setUserStorage(firestore().collection(info.user.id));
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      _load_BackEnd(userInfo);
      setUserStorage(firestore().collection(userInfo.user.id));
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
      // Removing user Info
    setUserInfo(null); 
    setUserStorage(null);
    setGettingLoginStatus(false);
    setBackEnd(null);
    setBackEndLoaded(false);
  };

  /////////////////////////////
  //Screens
  ///////////////////////////
  const Loading_Page = () =>{
    return(
    <><View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    </View></>
    )
  }

  const Login_Page = () =>{
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Example of Google Sign In in React Native
            </Text>
            <View style={styles.container}>
                <GoogleSigninButton
                  style={{width: 312, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={_signIn}
                />
            </View>
            <Text style={styles.footerHeading}>
              Google SignIn in React Native
            </Text>
            <Text style={styles.footerText}>
              www.aboutreact.com
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
  
  const Main_Page = () =>{
    return (
      <>
        <Appbar style = {styles.appBarStyle}>
        <Appbar.Content title={'Hellow! ' + userInfo.user.name} subtitle = {'EC463 Mini Project'}/>
        </Appbar>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.container}>
                  <Image
                    source={{uri: userInfo.user.photo}}
                    style={styles.imageStyle}
                  />
                  <Text style={styles.text}>
                    Name: {userInfo.user.name + backEndLoaded}
                  </Text>
                  <Text style={styles.text}>
                    Email: {userInfo.user.email + backEnd}
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={()=>{
                      console.log("aaaa"+backEnd);
                      _signOut();
                      console.log("+++++");
                      }}>
                    <Text>Logout</Text>
                  </TouchableOpacity>
            </View>
            <Text style={styles.footerHeading}>
              Google SignIn in React Native
            </Text>
            <Text style={styles.footerText}>
              www.aboutreact.com
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
////////////////////////////////


  if (gettingLoginStatus) {
    return (Loading_Page());
  } else if (userInfo == null){
    return (Login_Page());
  } else {
    return (Main_Page());
  }

};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  appBarStyle:{
    fontSize: 25,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});