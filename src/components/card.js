import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

export default class card extends Component {
    constructor(props){
        super(props);
        console.log(this.props.navigation)
    }
    render() {
        return (
            <View style={{height: 270, width: 134, marginLeft: 27}}>
                <Image source={{uri: `${this.props.data.bookImage}`}} style={{height: 200, width: null, resizeMode: "contain", borderRadius: 10, elevation: 5}}/>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('BookDetail')}><Text style={{fontFamily: 'Gotham_Medium', color: 'white', fontSize: 18,marginTop:8,marginBottom:5}}>{this.props.data.title}</Text></TouchableOpacity>
                <Text style={{fontFamily: 'SanFranciscoPro', fontSize: 16, color: '#838388'}}>{this.props.data.author}</Text>
            </View>
        )
    }
}
