// Example of Google Sign In in React Native Android and iOS App
// https://aboutreact.com/example-of-google-sign-in-in-react-native/

// Import React in our code
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import MainPage from './Screens/MainPage.js';

// Import all the components we are going to use
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

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const 
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

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
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    let info = await GoogleSignin.signInSilently();
    console.log('User Info --> ', info);
    setUserInfo(info);
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
      showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      //console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
      // Removing user Info
    setUserInfo(null); 
    setGettingLoginStatus(false);
    console.log('llllllllllllllll');
  };

  if (userInfo)
  {
    return MainPage({userInfo: userInfo, _signOut: _signOut});
  }
  else{
    return(<SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Example of Google Sign In in React Native
        </Text>
        <View style={styles.container}>
          {userInfo !== null ? (
            <>
              <Image
                source={{uri: userInfo.user.photo}}
                style={styles.imageStyle}
              />
              <Text style={styles.text}>
                Name: {userInfo.user.name}
              </Text>
              <Text style={styles.text}>
                Email: {userInfo.user.email}
              </Text>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={_signOut}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <GoogleSigninButton
              style={{width: 312, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={_signIn}
            />
          )}
        </View>
        <Text style={styles.footerHeading}>
          Google SignIn in React Native
        </Text>
        <Text style={styles.footerText}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
    );
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