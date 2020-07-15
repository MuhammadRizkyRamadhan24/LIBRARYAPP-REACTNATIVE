import React, { Component } from 'react'
import {Text, View, Button} from 'react-native'

class Detail extends Component {
    componentDidMount(){
        console.log(this.props)
    }

    render() {
        return (
            <View>
                <Text> Detail </Text>
                <Button title='Home' onPress={()=> this.props.navigation.navigate('Home')} />
                <Button title='Login' onPress={()=> this.props.navigation.navigate('Login')} />
            </View>
        )
    }
}

export default Detail;