import React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Food from '../Mini_Back/food.js';
import FoodEntry from '../Mini_Back/food_entry.js';
import Meal from '../Mini_Back/meal.js';
import NutritionForm from "../Mini_Back/nutrition_form.js";
import DayTakeIn from '../Mini_Back/day_takein.js';
import TestingSC from '../Mini_Back/test.js';

export default function MainPage(props) {
  const userInfo = props.userInfo;
  const userStorage = firestore().collection(userInfo.user.id);
  var backEnd_loaded = false;
  var backEnd = null;
  //////////////////////////////////
  var test_day = TestingSC();
  var aaaa = "TA";

  const upLoad_State = async () => {
      await userStorage.doc('DiateLog').set({test_day});
  }

  const load_BackEnd = () => {
    backEnd_loaded = false;
    userStorage.get().then(snapshot => {
    snapshot.forEach(doc => {
        if(doc.id == "DiateLog"){
            this.backEnd = doc.data().test_day;
            this.backEnd_loaded = true;
            console.log(this.backEnd);
        }
    });
  });}
  //////////////////////////////////
    // ...
    //const [ loading, setLoading ] = useState(true);
    //const [ backEnd, setBackEnd ] = useState(null);
    // ...
    //useEffect(() => {
        //meal = userStorage.doc('DiateLog').get()
        //setBackEnd(meal);
        //console.log(backEnd);
     // }, []);
  upLoad_State();
  backEnd = load_BackEnd();

  //

  //console.log(userInfo.user.id);
  //
  //
  //if(loading)
   // return null;
  //
  render() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>You're Logged In</Text>
      <Image
        source={{uri: userInfo.user.photo}}
        style = {{
            width: 200,
            height: 300,
            resizeMode: 'contain',
          }}
        />
      <Text style={styles.text}>{userInfo.user.displayName}</Text>
      <Text style={styles.text}>{userInfo.user.id}</Text>
      <View style={{ marginTop: 30 }}>
        {backEnd_loaded == true ? (
            <Button title="Loading...." onPress={props._signOut}/> 
        ):(
            <Button title = {aaaa} onPress={()=>{aaaa = "TB"}}/> 
        )}
      </View>
    </View>
  );
        }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
});