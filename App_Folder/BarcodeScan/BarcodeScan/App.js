/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
	      flashMode: RNCamera.Constants.FlashMode.auto,
      },
      barcode: ''
    };
  }

  onBarCodeRead(scanResult) {
    console.warn(scanResult.type);
    console.log(scanResult.data);
    if (scanResult.data != null) {
	    if (!this.barcodeCodes.includes(scanResult.data)) {
	      this.barcodeCodes.push(scanResult.data);
	      console.warn('onBarCodeRead call');
	    }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  handleBarcode = (text) => {
      this.setState({ barcode: text })
   }

  render() {
    return (
      <View style={styles.container}>
	    <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Barcode"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleBarcode}/>
	    <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.barcode
                }>
               <Text style = {styles.submitButtonText}> GO </Text>
        </TouchableOpacity>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            style={styles.preview}
            type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
	<Text style={styles.scanScreenMessage}></Text>
	</View>
	<View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={
		          () => { 
			              console.log('scan clicked'); 
			        }}
              style={styles.enterBarcodeManualButton}
              title="Scan Barcode"
          />
	    </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
  },
  submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
  },
  submitButtonText:{
      color: 'white'
  }

};

export default App;
