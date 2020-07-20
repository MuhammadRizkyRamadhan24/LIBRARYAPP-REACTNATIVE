import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Picker, TextInput, ImageBackground } from 'react-native';
import { Form, Item, Input, Label, Button , Toast, Textarea } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import background from '../public/images/auth-background.jpg';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          genre: '0',
          author: '0'
        };
      }
    onSelectedGenre = (itemValue, itemIndex) =>{
        this.setState({genre: itemValue})  
    }
    onSelectedAuthor = (itemValue, itemIndex) =>{
        this.setState({author: itemValue})  
    }
    render() {
        return (
            <ImageBackground source={background}  style={{flex: 1,backgroundColor: '#131212'}}>
                <View style={{height:77,backgroundColor:'black',flexDirection: 'row'}}>
                    <View style={{height:77,width:81,marginLeft:27,justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}><MaterialIcons color='white' name='arrow-back' size={24} /></TouchableOpacity>
                    </View>
                    <View style={{height:77,width:207,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily: 'Gotham_Medium',fontSize:26,color:'white'}}>Edit Data</Text>
                    </View>
                </View>
                <View style={{flex: 9,marginHorizontal:27,justifyContent:'center'}}>
                    <Form style={{backgroundColor:'rgba(0, 0, 0, 0.5)',borderRadius:32,borderWidth:10,borderColor:'rgba(0, 0, 0, 0.5)'}}>
                        <Item last>
                            <Input style={{color: '#FFF',fontFamily: 'SanFranciscoPro',fontSize: 18}} placeholder='Title' placeholderTextColor='white'/>
                        </Item>
                        <Item last>
                            <Text style={{color: '#FFF',fontFamily: 'SanFranciscoPro',fontSize: 18}}>  Genre</Text>
                            <Picker
                                selectedValue={this.state.genre}
                                style={{ height: 50, width: '90%', color:'white',fontFamily: 'SanFranciscoPro'}}
                                onValueChange={this.onSelectedGenre}
                            >
                                <Picker.Item label="" value="0" />
                                <Picker.Item label="Fiction" value="1" />
                            </Picker>
                        </Item>
                        <Item last>
                        <Text style={{color: '#FFF',fontFamily: 'SanFranciscoPro',fontSize: 18}}>  Author</Text>
                            <Picker
                                selectedValue={this.state.author}
                                style={{ height: 50, width: '100%', color:'white'}}
                                onValueChange={this.onSelectedAuthor}
                            >
                                <Picker.Item label="" value="0" />
                                <Picker.Item label="Me" value="1" />
                            </Picker>
                        </Item>
                        <Item last>
                            <TextInput
                            style={{height: '100%',width:'100%',textAlignVertical: 'top',color:'white',fontFamily: 'SanFranciscoPro',fontSize:18}}
                            underlineColorAndroid="transparent"
                            placeholder="Description"
                            placeholderTextColor="white"
                            numberOfLines={5}
                            multiline={true}
                            />
                        </Item>
                        
                        <Button style={{width:'100%',backgroundColor:'#34C759',borderRadius:30, marginTop:20}} block>
                            <Text style={{fontFamily: 'SanFranciscoPro',fontSize:20,color:'#FFF'}}>Borrowed</Text>
                        </Button>
                    </Form>
                </View>
            </ImageBackground>
        )
    }
}
