import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import { Button, Spinner } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import background from '../public/images/background.jpg';
import { API_URL } from '@env';

import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { returnBook } from '../redux/actions/borrow'
import { getAllHistory } from '../redux/actions/borrow';

class History extends Component {
    constructor(props) {
        super(props)
        this.state ={
            history: [],
            isLoading:true
        }
    }

    logout = () => {
        this.props
        .logout()
            ToastAndroid.showWithGravity(
                "Logout Success",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            return this.goToLogin();
    };

    goToLogin = () =>{
        this.props.navigation.navigate('Login');
    }

    getHistory = () => {
        const token = this.props.auth.data.token;
        const Username = this.props.auth.data.username;
        this.props
        .getAllHistory(token, Username)
        .then(()=>{
            const data = this.props.borrow.data.reverse()
            this.setState({
                history : data[0],
                isLoading: false,
            })
        });
    }

    returnBook = () => {
        const title = this.state.history.title
        const username = this.state.history.username
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
                return this.getHistory();
        });
    }

    componentDidMount(){
        this.getHistory();
    }

    render() {
        return (
            <ImageBackground source={background} style={{flex: 1,backgroundColor: '#131212'}}>
                <View style={{flex: 1,flexDirection: 'row',justifyContent:'flex-end'}}>
                    <View style={{height:81, width:120,marginRight:27,justifyContent:'flex-end', alignItems:'center',flexDirection:'row'}}>
                        {this.props.auth.data.role == 1
                        ?
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddBook')}><MaterialCommunityIcons name='book-plus' color='white' size={30} /></TouchableOpacity>
                        :
                        <>
                        </>
                        }
                        <TouchableOpacity onPress={this.getHistory} style={{marginLeft: 15}}><MaterialIcons name='refresh' color='white' size={30} /></TouchableOpacity>
                        <TouchableOpacity onPress={this.logout} style={{marginLeft: 15}}><MaterialIcons name='exit-to-app' color='white' size={30} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 4,marginHorizontal:27,justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                    <MaterialIcons name='account-circle' color='white' size={180} />
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:30,color:'white',marginTop:10}}>{this.props.auth.data.username}</Text>
                    {this.props.auth.data.role == 1
                    ?
                    <Text style={{fontFamily:'SanFranciscoPro',fontSize:24,color:'white',marginTop:10,color:'#34C759'}}>admin</Text>
                    :
                    <Text style={{fontFamily:'SanFranciscoPro',fontSize:24,color:'white',marginTop:10,color:'#34C759'}}>user</Text>
                    }
                </View>
                <View style={{flex: 1,marginHorizontal:27,alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:30,color:'white'}}>Last History</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('History')}><Text style={{marginLeft:165 ,fontFamily: 'SanFranciscoPro',color: '#F6C12D',fontSize: 18}}>View all</Text></TouchableOpacity>
                </View> 
                <View style={{flex: 4,marginHorizontal:27,justifyContent:'center',alignItems:'center'}}>
                    
                <View style={{height: 200, width: 285,flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri: API_URL + `static/images/${this.state.history.bookImage}`}} style={{height: 200, width: 135, resizeMode: "contain", borderRadius: 10, elevation: 5}}/>
                    <View style={{marginLeft:20,justifyContent:'center'}}>
                        <Text style={{fontFamily: 'Gotham_Medium', color: 'white', fontSize: 28,marginTop:8,marginBottom:20,width:150}}>{this.state.history.title}</Text>
                        {this.state.history.status == 'Dikembalikan' ? 
                        <Button style={{width:100,backgroundColor:'#F6C12D',borderRadius:30}} block disabled={true}>
                            <Text style={{fontFamily: 'SanFranciscoPro',fontSize:18,color:'#838388'}}>Returned</Text>
                        </Button>
                        :
                        <Button onPress={this.returnBook} style={{width:100,backgroundColor:'#34C759',borderRadius:30}} block>
                            <Text style={{fontFamily: 'SanFranciscoPro',fontSize:18,color:'#838388'}}>Return</Text>
                        </Button>
                        }   
                        
                    </View>
                </View>
                </View> 
            </ImageBackground>
        )
    }
}


const mapStateToProps = state =>({
    auth: state.auth,
    books: state.books,
    borrow: state.borrow
});

const mapDispatchToProps = { getAllHistory, logout, returnBook };

export default connect(mapStateToProps,mapDispatchToProps)(History);