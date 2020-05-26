import React, { useState, useEffect } from 'react';
import { AsyncStorage, SafeAreaView , Platform, ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import SpotList from '../components/SpotList';

import logoImg from '../assets/logo.png';

export default function List() {
    const [user, setUser] = useState('');
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(techs => {
            const techsArray = techs.split(', ').map(tech => tech.trim());

            setTechs(techsArray);
        });
        AsyncStorage.getItem('user').then(user => setUser(user));
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