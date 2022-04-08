import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity,
    Image, TextInput, Modal
    
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {useSelector, useDispatch} from 'react-redux'
import {setName, setPassword} from '../redux/actions';
import { setTaskID, setTasks } from '../redux/actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Home({ navigation, route }) {


    const { name, tasks } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getUser();
        getTasks();
    }, []);

    const getUser = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        dispatch(setName(user.Name));
                        dispatch(setPassword(user.Password));
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }


    const removeUser = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }


    const getTasks = () => {
        setShowFilter(false)
        AsyncStorage.getItem('Tasks')
            .then(tasks => {
                const parsedTasks = JSON.parse(tasks);
                if (parsedTasks && typeof parsedTasks === 'object') {
                    dispatch(setTasks(parsedTasks));
                }
            })
            .catch(err => console.log(err))
    }

    

    const OrderOverdue = () => {
        setShowFilter(false)
        AsyncStorage.getItem('Tasks')
            .then(tasks => {
                const parsedTasks = JSON.parse(tasks);
                const Overduetasks =  parsedTasks.filter(
                    (obj) =>{
                        var datecreation = new Date()
                        var datecreation2 = new Date(obj.Duedate)
                        return datecreation.getTime() >= datecreation2.getTime()
                    }
                )
                if (Overduetasks && typeof Overduetasks === 'object') {
                    dispatch(setTasks(Overduetasks));
                }
            })
            .catch(err => console.log(err))
    }

    const OrderFuture = () => {
        setShowFilter(false)
        AsyncStorage.getItem('Tasks')
            .then(tasks => {
                const parsedTasks = JSON.parse(tasks);
                const Overduetasks =  parsedTasks.filter(
                    (obj) =>{
                        var datecreation = new Date()
                        var datecreation2 = new Date(obj.Duedate)
                        return datecreation.getTime() <= datecreation2.getTime()
                    }
                )
                if (Overduetasks && typeof Overduetasks === 'object') {
                    dispatch(setTasks(Overduetasks));
                }
            })
            .catch(err => console.log(err))
    }

    const OrderToday = () => {
        setShowFilter(false)
        AsyncStorage.getItem('Tasks')
            .then(tasks => {
                const parsedTasks = JSON.parse(tasks);
                const Overduetasks =  parsedTasks.filter(
                    (obj) =>{
                        var datecreation = new Date()
                        var datecreation2 = new Date(obj.Duedate)
                        return datecreation.getDate() == datecreation2.getDate() && datecreation.getFullYear() == datecreation2.getFullYear() && datecreation.getMonth() == datecreation2.getMonth()
                    }
                )
                if (Overduetasks && typeof Overduetasks === 'object') {
                    dispatch(setTasks(Overduetasks));
                }
            })
            .catch(err => console.log(err))
    }


    const OrderByDateNew = () => {
        setShowFilter(false)
        const filteredTasks = tasks.sort( function(a,b){
            return new Date(a.Duedate) - new Date(b.Duedate) ;
          });
        if (filteredTasks && typeof filteredTasks === 'object') {
            dispatch(setTasks(filteredTasks));
        }
    }
    

    const OrderByDateOldest = () => {
        setShowFilter(false)
        const filteredTasks = tasks.sort( function(a,b){
            return  new Date(b.Duedate) - new Date(a.Duedate) ;
          });
        if (filteredTasks && typeof filteredTasks === 'object') {
            dispatch(setTasks(filteredTasks));
        }
    }

    const OrderByColor = () => {
        setShowFilter(false)
        const filteredTasks = tasks.sort((a, b) => a.Color.localeCompare(b.Color));
        if (filteredTasks && typeof filteredTasks === 'object') {
            dispatch(setTasks(filteredTasks));
        }
    }

    const searchFilter = (text) => {
        
        if(text){
            const SearchedData =  tasks.filter((tasks) =>{
                const itemData = tasks.Title ?  tasks.Title.toUpperCase() : ''.toUpperCase()
               const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            dispatch(setTasks(SearchedData));
            setSearch(text)
        }else{
            getTasks();
            setSearch(text);
        }
    }


    


    const deleteTask = (id) => {
        const filteredTasks = tasks.filter(task => task.ID !== id);
        AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
            .then(() => {
                dispatch(setTasks(filteredTasks));
                Alert.alert('Success!', 'Task removed successfully.');
            })
            .catch(err => console.log(err))
    }

    const checkTask = (id, newValue) => {
        const index = tasks.findIndex(task => task.ID === id);
        if (index > -1) {
            let newTasks = [...tasks];
            newTasks[index].Done = newValue;
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks));
                    Alert.alert('Success!', 'Task state is changed.');
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <View style={styles.body}>
            <View style={{alignItems:"center",margin:10}}>
                <TouchableOpacity onPress={removeUser}>
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
                <TextInput
                    value={search}
                    style={styles.input}
                    placeholder='Search task here'
                    onChangeText={(text) => searchFilter(text)}
                />
            </View>
            <Modal
                    visible={showFilter}
                    transparent
                    onRequestClose={() =>
                    setShowFilter(false)
                    }
                    animationType='slide'
                    hardwareAccelerated
                >
                <View style={styles.centered_view}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                        <Text style={styles.text}>Filter</Text>
                        </View>
                        <View style={styles.warning_body}>
                        
                        <View style={{justifyContent:'center',
                            flexDirection:'row',
                            flexWrap: 'wrap', margin:15}}>
                            <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,margin:5,
                                backgroundColor: '#0080ff',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={OrderByColor}
                        >
                            <FontAwesome5
                                name={'bomb'}
                                size={20}
                                color={'#ffffff'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#0080ff',
                                justifyContent: 'center',
                                alignItems: 'center',margin:5,
                            }}
                            onPress={OrderByDateOldest}
                        >
                            <FontAwesome5
                                name={'arrow-circle-down'}
                                size={20}
                                color={'#ffffff'}
                            />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#0080ff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation: 5,margin:5,
                            }}
                            onPress={OrderByDateNew}
                        >
                            <FontAwesome5
                                name={'arrow-circle-up'}
                                size={20}
                                color={'#ffffff'}
                            />
                        </TouchableOpacity>
                        </View>
                        
                    <View style={{justifyContent:'center',
                            flexDirection:'row',
                            flexWrap: 'wrap'}}>
                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#0080ff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin:5,
                                elevation: 5,
                            }}
                            onPress={OrderOverdue}
                        >
                            <FontAwesome5
                                name={'arrow-circle-left'}
                                size={20}
                                color={'#ffffff'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#0080ff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation: 5,margin:5,
                            }}
                            onPress={OrderFuture}
                        >
                            <FontAwesome5
                                name={'arrow-circle-right'}
                                size={20}
                                color={'#ffffff'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#0080ff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation: 5,
                                margin:5,
                            }}
                            onPress={OrderToday}
                        >
                            <FontAwesome5
                                name={'circle'}
                                size={20}
                                color={'#ffffff'}
                            />
                        </TouchableOpacity>
                    </View>
                        

                        
                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#0080ff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation: 5,
                                marginTop:15,
                            }}
                            onPress={getTasks}
                        >
                            <FontAwesome5
                                name={'broom'}
                                size={20}
                                color={'#ffffff'}
                            />
                        </TouchableOpacity>


                         </View>
                        <TouchableOpacity
                            onPress={() => setShowFilter(false)}
                            style={styles.warning_button}
                            android_ripple={{color:'#fff'}}
                            >
                            <Text style={{
                                fontSize: 25,
                                margin: 10,
                                alignItems: 'center',
                            }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </Modal>


                
            <FlatList
                data={tasks.filter(task => task.Done === false)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(setTaskID(item.ID));
                            navigation.navigate('Task');
                        }}
                    >
                        <View style={styles.item_row}>
                            <View
                                style={[
                                    {
                                        backgroundColor:
                                            item.Color === '1red' ? '#f28b82' :
                                            item.Color === '2orange' ? '#f2c382' :
                                            item.Color === '3green' ? '#ccff90' : '#ffffff'
                                    },
                                    styles.color]}
                            />
                            <CheckBox
                                value={item.Done}
                                onValueChange={(newValue) => { checkTask(item.ID, newValue) }}
                            />
                            <View style={styles.item_body}>
                                <Text
                                    style={[
                                        styles.title
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.Title}
                                </Text>
                                <Text
                                    style={[
                                     
                                        styles.subtitle
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.Desc}
                                </Text>
                            </View>
                            {item.Image ? (
                                <View style={styles.item_body}>
                                    <Image style={{ height: 100, width: 100 }} source={{ uri: item.Image }} />
                                </View>

                            ):(<></>) }
                            
                            <TouchableOpacity
                                style={styles.delete}
                                onPress={() => { deleteTask(item.ID) }}
                            >
                                <FontAwesome5
                                    name={'trash'}
                                    size={25}
                                    color={'#ff3636'}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

           
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#0080ff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    elevation: 5,
                }}
                onPress={() => {
                    setShowFilter(true)
                }}
            >
                <FontAwesome5
                    name={'sort'}
                    size={20}
                    color={'#ffffff'}
                />
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(setTaskID(tasks.length + 1));
                    navigation.navigate('Task');
                }}
            >
                <FontAwesome5
                    name={'plus'}
                    size={20}
                    color={'#ffffff'}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    text: {
        fontSize: 25,
        margin: 10,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0080ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5,
    },
    item_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_body: {
        flex: 1,
    },
    delete: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        color: '#000000',
        fontSize: 30,
        margin: 5,
    },
    subtitle: {
        color: '#999999',
        fontSize: 20,
        margin: 5,
    },
    color: {
        width: 20,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,
    },
    centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
      },
    warning_modal: {
        width: 300,
        height: 400,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
      },
      warning_title: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      },
      warning_body: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
      },
      warning_button:{
        backgroundColor:'white',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        alignItems: "center",
      }
})