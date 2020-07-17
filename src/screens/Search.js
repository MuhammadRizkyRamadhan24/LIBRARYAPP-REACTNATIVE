import React, { Component } from 'react'
import {Text, View, Button} from 'react-native'

class Search extends Component {
    componentDidMount(){
        console.log(this.props)
    }

    render() {
        return (
            <View>
                <Text> Search </Text>
                <Button title='Home' onPress={()=> this.props.navigation.navigate('Home')} />
                <Button title='Login' onPress={()=> this.props.navigation.navigate('Login')} />
            </View>
        )
    }
}

export default Search;