import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import Map from "../map";
import MapView, { Marker } from 'react-native-maps';
import Layout from "../constants/Layout"

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialRegion: null
    }
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
        this.setState({
          initialRegion: region
        })

        this.map.animateToRegion(region, 1000)
      },
      error => console.log(error),
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 1000
      }
    )
  }

  componentDidMount() {
    this.getCurrentLocation()
  }

  render() {
    return (
      <View style={styles.container} >
        <MapView
          style={styles.mapStyle}
          showsUserLocation
          showsMyLocationButton
          initialRegion={this.state.initialRegion}
          ref={(map) => { this.map = map }}
        >

          <MapView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
          container: {
          flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
          width: Layout.window.width,
    height: Layout.window.height,
  },
  developmentModeText: {
          marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
          paddingTop: 30,
  },
  welcomeContainer: {
          alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
          width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
          alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
          marginVertical: 7,
  },
  codeHighlightText: {
          color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
          backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
          fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
          position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
          ios: {
          shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
          elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
          fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
          marginTop: 5,
  },
  helpContainer: {
          marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
          paddingVertical: 15,
  },
  helpLinkText: {
          fontSize: 14,
    color: '#2e78b7',
  },
});
