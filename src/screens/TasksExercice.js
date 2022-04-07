import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import raw2 from "../data.json"
import raw from "../data3.json"

export default function Tasks({ navigation }) {

    const [sentence, setSentence] = useState('');
    const [totalsum, setTotalsum] = useState('');
    const [sentenceResult, setSentenceResult] = useState([]);

    useEffect(() => {
        triangleSum();
    }, []);


    const triangleSum = () => {
        var sum = 0;
        var LastIndex = 0;
        for( var i = 0 ; i< raw2.length ; i++){
            if(i>0){
                const myArray = raw2[i].split(" ");
                if(LastIndex>0){
                    if(parseInt(myArray[LastIndex]) > parseInt(myArray[LastIndex-1]) && parseInt(myArray[LastIndex]) > parseInt(myArray[LastIndex + 1])){
                        LastIndex = LastIndex
                        sum+=parseInt(myArray[LastIndex])
                    }
                    if(parseInt(myArray[LastIndex]) < parseInt(myArray[LastIndex-1]) && parseInt(myArray[LastIndex-1]) > parseInt(myArray[LastIndex + 1])){
                        LastIndex = LastIndex-1
                        sum+=parseInt(myArray[LastIndex])
                    }
                    if(parseInt(myArray[LastIndex]) < parseInt(myArray[LastIndex+1]) && parseInt(myArray[LastIndex-1]) < parseInt(myArray[LastIndex + 1])){
                        LastIndex = LastIndex + 1
                        sum+=parseInt(myArray[LastIndex])
                    }
                }else{
                    if( parseInt(myArray[LastIndex]) > parseInt(myArray[LastIndex + 1])){
                        LastIndex = LastIndex
                        sum+=parseInt(myArray[LastIndex])
                    }
                    if(parseInt(myArray[LastIndex]) < parseInt(myArray[LastIndex+1])){
                        LastIndex = LastIndex + 1
                        sum+=parseInt(myArray[LastIndex])
                    }
                }
            }else{
                sum = parseInt(raw2[0])
                LastIndex = 0;
            }
        }
        setTotalsum(sum)
    }

    const readSentence = (sentence) => {
        var a = "abcdefghijklmnopqrstuvwxyz";

        sentence = sentence.replace(/[^a-zA-Z]/g, "");
        sentence = sentence.toLowerCase();

        var result = [];

        for (var i = 0; i < a.length; i++) {
            if (sentence.indexOf(a[i]) == -1) {
                result.push(a[i]);
            }
        }
        setSentenceResult(result)
    }




    return (
        <View style={styles.body}>
            <Text style={styles.text}>
               Task 1 triangle
            </Text> 
            <Text style={styles.textresult}>
               {totalsum}
            </Text> 
            <Text style={styles.text}>
               Task 2 sentence
            </Text> 
            <TextInput
                style={styles.input}
                placeholder='Enter sentence'
                onChangeText={(value) => setSentence(value)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    readSentence(sentence)
                }}
            >
                    <Text style={{
                                    fontSize: 20,
                                    color: '#ffffff',
                                }}>
                   Check pangram
                </Text>
            </TouchableOpacity>
            {!sentenceResult.length>0 ? (
              <Text style={styles.textresult}>
                is a pangram
              </Text> 
            ) : (
            <Text style={styles.textresult}>
               {sentenceResult}
            </Text> 
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        margin: 10,
    },
    textresult: {
        fontSize: 20,
        margin: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#2F2F2F",
        padding: 15,
        borderRadius:15,
    },
  
})