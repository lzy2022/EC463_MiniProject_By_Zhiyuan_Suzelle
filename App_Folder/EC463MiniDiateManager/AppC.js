import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Food from './Mini_Back/food.js';
import FoodEntry from './Mini_Back/food_entry.js';
import Meal from './Mini_Back/meal.js';
import NutritionForm from "./Mini_Back/nutrition_form.js";
import DayTakeIn from './Mini_Back/day_takein.js';
import TestingSC from './Mini_Back/test.js';
import BackEnd from './Mini_Back/back_end.js';
import { BottomNavigation, List} from 'react-native-paper';
import { FlatList, ScrollView, TextInput, Button} from 'react-native';


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
import { white } from 'react-native-paper/lib/typescript/styles/colors';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userStorage, setUserStorage] = useState(null);
  const [backEnd, setBackEnd] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [backEndLoaded, setBackEndLoaded] = useState(false);
  const [editingItem, setEditingItem] = useState(false);
  const [nowEditing, setNowEditing] = useState(null);
  const [editName, setEditName] = useState(null);
  const [editServingSize, SetEditServingSize] = useState(null);
  const [edit_M, setEdit_M] = useState(0);
  const [edit_F, setEdit_F] = useState(0);
  const [editType, setEditType] = useState(0); //1 for day 2 for meal 3 for food

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      webClientId: '618239383022-fogd500apr628f3ju41o47k96iuil6m9.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    let temp = new BackEnd();
    setBackEnd(temp);
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
    const temp = new BackEnd();
    if (typeof Info !== "undefined"){
      firestore().collection(Info.user.id).get().then(snapshot => {
      snapshot.forEach(doc => {
          if(doc.id == "DiateLog"){
              console.log(doc.data().temp);
              temp.copy(doc.data().temp);
              setBackEnd(temp);
              console.log("{{{{{{"+temp);
              setBackEndLoaded(true);
          }
        });
    });}
  };
  

  const _save_BackEnd = async (temp) =>{
    await firestore().collection(userInfo.user.id).doc('DiateLog').set({temp});
  }

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
  //Elements////////////////////////
  //Bottom navigation/////

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'edit', title: 'Edit', icon: 'pencil' },
    { key: 'camera', title: 'Camera', icon: 'camera' },
    { key: 'savedfile', title: 'Saved Files', icon: 'book' },
  ]);

  renderScene = ({route}) => {
    switch (route.key) {
      case 'edit':
        return <EditRoute/>;
      case 'camera':
        return <CameraRoute/>;
      case 'savedfile':
        return <SavedFileRoute/>;
    }
  }
  ////////////////////////
  //handlers for the backend manipulation
  function delete_item_index(meal_num, entry_num){
    let temp = new BackEnd();
    temp.copy(backEnd);
    temp.current_day.meals[meal_num].entries.splice(entry_num, 1);
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function delete_meal_index(meal_num){
    let temp = new BackEnd();
    temp.copy(backEnd);
    temp.current_day.meals.splice(meal_num, 1);
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function add_item_saved(new_food){
    let temp = new BackEnd();
    temp.copy(backEnd);
    var i = temp.saved_food.length;
    temp.saved_food[i] = new Food();
    temp.saved_food[i].copy(new_food);
    _save_BackEnd(temp);
    setBackEnd(temp);
    console.log(temp.saved_food);
  }

  function add_day_saved(){
    let temp = new BackEnd();
    temp.copy(backEnd);
    var i = temp.saved_day.length;
    temp.saved_day[i] = new DayTakeIn();
    temp.saved_day[i].copy(temp.current_day);
    _save_BackEnd(temp);
    setBackEnd(temp);
    console.log(temp.saved_day);
  }

  function start_newDay(){
    let temp = new BackEnd();
    let day1 = new DayTakeIn();
    temp.copy(backEnd);
    temp.current_day.copy(day1);
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function change_dayName(){
    let temp = new BackEnd();
    temp.copy(backEnd); 
    temp.current_day.name = editName;
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function change_mealName(m_index){
    let temp = new BackEnd();
    temp.copy(backEnd); 
    temp.current_day.meals[m_index].name = editName;
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function change_foodName(m_index, f_index){
    let temp = new BackEnd();
    temp.copy(backEnd); 
    temp.current_day.meals[m_index].entries[f_index].entry.name = editName;
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function change_servingSize(m_index, f_index){
    let temp = new BackEnd();
    temp.copy(backEnd); 
    temp.current_day.meals[m_index].entries[f_index].serving_size = 100;
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function add_meal(){
    let temp = new BackEnd();
    let meal1 = new Meal();
    temp.copy(backEnd);
    temp.current_day.add_Meal(meal1);
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function add_item_index(meal_num, saved_food){
    let entry1 = new FoodEntry();
    let temp = new BackEnd();
    console.log(meal_num);
    temp.copy(backEnd);
    entry1.entry.copy(saved_food);
    temp.current_day.meals[meal_num].add_Entry(entry1);
    _save_BackEnd(temp);
    setBackEnd(temp);
  }

  function show_msg(item){
    console.log(item.name);
    console.log(item.return_nutri());
  }

  const renderMeals = ({item}) =>{
    const test_food = new Food();
    const m_index = backEnd.current_day.meals.indexOf(item)
    test_food.name = "Apple";
    return(<>
      <List.Accordion
        title = {item.name}
        left ={(m_index) => <List.Icon icon="plus"/>}
        onPress={() => show_msg(item)}
        onLongPress = {() => {setEditType(2);setEditingItem(true);setEdit_M(m_index)}}>
      </List.Accordion>
      <List.Item style = {styles.mealText}
            title = " + Add Food"
            onPress={() => add_item_index(m_index, test_food)}/>
      <FlatList
            data={item.entries}
            renderItem={(item) => renderFoods(item, m_index)}
          />
    </>);
  }

  const renderFoods = ({item}, m_index) =>{
    const f_index = backEnd.current_day.meals[m_index].entries.indexOf(item);
    return(<>
      <List.Item
        title = {item.entry.name + " X " + item.serving_size}
        left ={(m_index) => <List.Icon icon="minus"/>}
        onPress={() => show_msg(item)}
        onLongPress = {() => {setEditType(3);setEditingItem(true);setEdit_M(m_index);setEdit_F(f_index);}}>
      </List.Item>
    </>);
  }

  ////////////////

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

  const Test_Page = () =>{
    return (<>
          <SafeAreaView style={{flex: 4}}>
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
      </>);
  };

  
  const Main_Page = () =>{
    return (
      <>
        <Appbar style = {styles.appBarStyle}>
        <Appbar.BackAction onPress = {_signOut} icon = "exit"/>
        <Appbar.Content title={'Hellow! ' + userInfo.user.name} subtitle = {'EC463 Mini Project'}/>
        <Appbar.Action icon = {{uri: userInfo.user.photo}}/>
        </Appbar>
        
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </>
    );
  }

  const ItemEdit_Page = () => {

    const name_Pressed = () =>{
      if (editType == 1) {change_dayName();}
      else if (editType == 2) {change_mealName(edit_M);}
      else {change_foodName(edit_M, edit_F);}
    };

    const delet_Pressed = () =>{
      if (editType == 2) {delete_meal_index(edit_M);}
      else {delete_item_index(edit_M, edit_F);}
      setEditingItem(false);
    };

    return(
      <>
      <Appbar.Header style={{backgroundColor: "#CBCBFA"}}>
        <Appbar.BackAction onPress = {()=>{setEditingItem(false)}}/>
        <Appbar.Content title={"Edit Item..."}/>
        </Appbar.Header>

        <Text style = {styles.EditText}>Edit Name:</Text>
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {(text) => setEditName(text)}/>
          <Button
              title="Save Name"
              onPress={() => {name_Pressed()}}
          />
      
      {
        editType == 3 ? 
        (<>
          <Text style = {styles.EditText}>Set Serving Size:</Text>
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Serving Size"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {(text) => SetEditServingSize(parseInt(text, 10))}/>
          <Button
              title="Set Serving Size"
              onPress={() => {change_servingSize(edit_M, edit_F)}}
          />
        </>):(<></>)
      }

      {
        editType !== 1 ? 
        (<>
          <Button
              title="Delete Item"
              onPress={() => {delet_Pressed()}}
          />
        </>):(<></>)
      }
      </>
    );
  }

  const EditRoute = () => {
    const day_edit_pressed = () => {
      setEditType(1);
      setEditingItem(true);
    };
    if(typeof backEnd !== "object"){return(<></>);}
    return(
  <>
        <Appbar.Header style={{backgroundColor: "#CBCBFA"}}>
        <Appbar.Action onPress = {add_day_saved} icon = "book"/>
        <Appbar.Content title={backEnd.current_day.name}/>
        <Appbar.Action onPress = {()=> show_msg(backEnd.current_day)} icon = {"label"}/>
        <Appbar.Action onPress = {day_edit_pressed} icon = {"pencil"}/>
        <Appbar.Action onPress = {start_newDay} icon = {"plus"}/>
        </Appbar.Header>
        <SafeAreaView style={styles.mealContainer}>
          <List.Item style = {styles.mealText}
              title = " + Add Meal"
              onPress={() => add_meal()}/>
            <FlatList
            data={backEnd.current_day.meals}
            renderItem={(item) => renderMeals(item)}
          />
        </SafeAreaView>
  </>);};

  const CameraRoute = () => {return(<Text>Camera</Text>);};
  
  const SavedFileRoute = () => {return(<><Text>Saveeeeed</Text></>);};


////////////////////////////////


  if (gettingLoginStatus) {
    return (Loading_Page());
  } else if (userInfo == null){
    return (Login_Page());
  } else if (editingItem == true)
  {
    return (ItemEdit_Page());
  }else{
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
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  ToolBarStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  appBarStyle: {
    fontSize: 25,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  mealText: {
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
  EditText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});