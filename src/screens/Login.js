import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux'
import {setName, setPassword} from '../redux/actions';


export default function Login({ navigation }) {


    const { name, password } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        navigation.replace('My Tasks');
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const setData = async () => {
        if (name.length == 0 || password.length == 0) {
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                dispatch(setName(name));
                dispatch(setPassword(password));
                var user = {
                    Name: name,
                    Password: password,
                }
                await AsyncStorage.setItem('UserData', JSON.stringify(user));
                navigation.replace('My Tasks');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.body} >
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    backgroundColor: "#2F2F2F",
                    padding: 15,
                    borderRadius:15,
                    marginTop:70
                }}
                onPress={()=>{navigation.navigate('Tasks');}}
            >
                    <Text style={{
                                    fontSize: 20,
                                    color: '#ffffff',
                                }}>
                   Tasks
                </Text>
            </TouchableOpacity>


            <Text style={{
                        fontSize: 30,
                        color: '#2F2F2F',
                        marginTop:90,
                        marginBottom:40,
                    }}>
                Tychon Do list
            </Text>
           
            <TextInput
                style={styles.input}
                placeholder='Enter your username'
                onChangeText={(value) => dispatch(setName(value))}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your password'
                onChangeText={(value) => dispatch(setPassword(value))}
            />
            

            <TouchableOpacity
                style={styles.button}
                onPress={setData}
            >
                    <Text style={{
                                    fontSize: 20,
                                    color: '#ffffff',
                                }}>
                   Login
                </Text>
            </TouchableOpacity>
            
          
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#2F2F2F",
        padding: 15,
        borderRadius:15,
    },
    logo: {
        width: 100,
        height: 100,
        margin: 20,
    },
    
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    }
})