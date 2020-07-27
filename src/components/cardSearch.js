import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { API_URL } from '@env';

export default class card extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{height: 320, width: 154,marginHorizontal:15,marginVertical:10}}>
                <Image source={{uri: API_URL + `static/images/${this.props.data.bookImage}`}} style={{height: 230, width: null, resizeMode: "contain", borderRadius: 10}}/>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('BookDetail',{ id: this.props.data.id })}><Text style={{fontFamily: 'Gotham_Medium', color: 'white', fontSize: 20,marginVertical:10}}>{this.props.data.title}</Text></TouchableOpacity>
                <Text style={{fontFamily: 'SanFranciscoPro', fontSize: 15, color: '#838388'}}>{this.props.data.author}</Text>
            </View>
        )
    }
}
