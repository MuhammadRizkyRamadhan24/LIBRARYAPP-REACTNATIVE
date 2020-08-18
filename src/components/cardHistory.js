import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { returnBook } from '../redux/actions/borrow';

class cardHistory extends Component {
    constructor(props){
        super(props);
    }

    returnBook = () => {
        const title = this.props.data.title
        const username = this.props.data.username
        const token = this.props.auth.data.token
        const data = {
            title: title,
            username: username
        }
        this.props
        .returnBook(token, data).then(() => {
            ToastAndroid.showWithGravity(
            "Return success",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
            );
            return this.goToHistory();
        });
    }

    goToHistory = () =>{
        this.props.navigation.replace('History');
    }

    render() {
        return (
            <View style={{height:80,width:'100%',borderWidth:2,marginVertical:4,borderColor:'white',borderRadius:10,flexDirection:'row'}}>
                <View style={{width:50,justifyContent:'center',marginLeft:20}}>
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:24,color:'white'}}>{this.props.data.id_borrow}</Text>
                </View>
                <View style={{width:225,justifyContent:'center'}}>
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:20,color:'white'}}>{this.props.data.title}</Text>
                    <Text style={{fontFamily:'SanFranciscoPro',fontSize:18,color:'#838388'}}>{this.props.data.status}</Text>
                </View>
                <View style={{width:50,justifyContent:'center',alignItems:'flex-end'}}>
                    {this.props.data.status == 'Dikembalikan' ? 
                    <TouchableOpacity disabled={true}><MaterialIcons name='update' color='#F6C12D' size={40} /></TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.returnBook}><MaterialIcons name='update' color='#34C759' size={40} /></TouchableOpacity>
                    }                    
                </View>
            </View>
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    books: state.books,
    borrow: state.borrow
});

const mapDispatchToProps = { returnBook };

export default connect(mapStateToProps,mapDispatchToProps)(cardHistory);