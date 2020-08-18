import React, { Component } from 'react';
console.disableYellowBox = true;
import Card from '../components/card'
import {View, Text, TouchableOpacity, ScrollView, ToastAndroid, ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import background from '../public/images/background.jpg';

import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { latestBooks,newArrivals } from '../redux/actions/books';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            monthyear: null,
            day: null,
            dayName: null,
            bookNew: [],
            bookOld: [],
            isLoading: false
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

    newArrivals = () => {
        const token = this.props.auth.data.token;
        this.props
        .newArrivals(token)
        .then(()=>{
            this.setState({
                bookNew : this.props.books.dataNew
            })
        });
    }

    latestBooks = () => {
        const token = this.props.auth.data.token;
        this.props
        .latestBooks(token)
        .then(()=>{
            this.setState({
                bookOld : this.props.books.dataOld
            })
        });
    }

    refresh = () => {
        const token = this.props.auth.data.token;
        this.props.latestBooks(token)
        this.props.newArrivals(token)
        .then(()=>{
            this.setState({
                bookOld : this.props.books.dataOld,
                bookNew : this.props.books.dataNew
            })
            console.log(this.state.bookOld)
            console.log(this.state.bookNew)
        });
    }

    componentDidMount(){
        this.newArrivals();
        this.latestBooks();
    }
    
    render() {
        return (
        <ImageBackground source={background} style={{flex: 1,backgroundColor: '#131212'}}>
            <View style={{flex: 2,flexDirection: 'row'}}>
                <View style={{height:81, width:210,marginLeft:27,justifyContent: 'center',flexDirection: 'column'}}>                
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:26,marginLeft:5,color: 'white'}}>Welcome,</Text>
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:24,marginLeft:5,color: 'white'}}>{this.props.auth.data.username}</Text>
                </View>
                <View style={{height:81, width:159,justifyContent:'flex-end', alignItems:'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.refresh} style={{marginLeft: 15}}><MaterialIcons name='refresh' color='white' size={30} /></TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text style={{marginLeft:27,fontFamily: 'Gotham_Medium',fontSize: 26,color: 'white'}}>New arrivals</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Search')}><Text style={{marginLeft:133 ,fontFamily: 'SanFranciscoPro',color: '#F6C12D',fontSize: 18}}>View all</Text></TouchableOpacity>
                </View>   
            </View>
            <View style={{flex: 7, flexDirection: "row"}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.state.bookNew.map((value)=>{
                return(
                <View key={value}>
                    <Card data={value} navigation={this.props.navigation}/>
                </View>
                )
                })}
                </ScrollView>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text style={{marginLeft:27,fontFamily: 'Gotham_Medium',fontSize: 26,color: 'white'}}>Latest Books</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Search')}><Text style={{marginLeft:133 ,fontFamily: 'SanFranciscoPro',color: '#F6C12D',fontSize: 18}}>View all</Text></TouchableOpacity>
                </View>   
            </View>
            <View style={{flex: 7, flexDirection: "row"}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.state.bookOld.map((value)=>{
                    return(
                    <View key={value}>
                        <Card data={value} navigation={this.props.navigation}/>
                    </View>
                    )
                    })}
                </ScrollView>
            </View>
        </ImageBackground>
        )
    }
}
const mapStateToProps = state =>({
    auth: state.auth,
    books: state.books
});

const mapDispatchToProps = { latestBooks, newArrivals, logout };

export default connect(mapStateToProps,mapDispatchToProps)(Home);

// export default Home;