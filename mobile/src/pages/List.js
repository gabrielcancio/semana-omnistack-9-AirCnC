import React, { useState, useEffect } from 'react';
import { AsyncStorage, SafeAreaView , Platform, ScrollView, View, Text, Image, StyleSheet, Alert } from 'react-native';
import socketio from 'socket.io-client';
import Constants from 'expo-constants';

import SpotList from '../components/SpotList';

import logoImg from '../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.42.81:3333', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(techs => {
            const techsArray = techs.split(', ').map(tech => tech.trim());

            setTechs(techsArray);
        });
    },[]);

    return(
        <SafeAreaView style={styles.container}>
            <Image source={logoImg} style={styles.logo} />

           <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
           </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight + 10 : 10,
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
    }
});