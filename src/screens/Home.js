import React, { Component } from 'react';
import {View,Text, StyleSheet, Button} from 'react-native';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount(){
        setTimeout(() =>{
            this.setState({
                count: 1
            })
        }, 1000)
        console.log('did mount')
    }
    
    render() {
        return (
        <View>
            <Text style={style.title}>Home</Text>
            <Text style={style.count}>{this.state.count}</Text>
            <Button title='Detail' onPress={()=> this.props.navigation.navigate('Detail', {Coba: '1'})} />
        </View> 
        )
    }
}


const style = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    count: {
        textAlign: "center"
    }
});

export default Home;