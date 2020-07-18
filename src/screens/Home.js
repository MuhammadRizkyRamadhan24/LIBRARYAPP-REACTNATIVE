import React, { Component } from 'react';
import Card from '../components/card'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: [
                {
                    id: 1,
                    title: '78 Resep MPASI',
                    author: 'dr. Meta Hanindita, Sp.A',
                    bookImage: 'https://cdn.gramedia.com/uploads/items/9786020643250_Mommyclopedia_5_78_Resep_MAPASI_C_1_4-1.jpg'
                },
                {
                    id: 2,
                    title: 'Be Creative Kidpreneur',
                    author: 'Ana Widyastuti, M.pd',
                    bookImage: 'https://cdn.gramedia.com/uploads/items/9786230017896_Cover_Be_Creative_Kidpreneur.jpg'
                },
                {
                    id: 3,
                    title: 'Promil Tanpa Galau',
                    author: 'Teman Bumil',
                    bookImage: 'https://cdn.gramedia.com/uploads/items/9786020523569_Promil_Tanpa_Galau_ACC_R3_Bleed_UV-1.jpg'
                }
            ],
            monthyear: null,
            day: null,
            dayName: null,
        }
    }

    date = () =>{
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dateObj = new Date();
        const month = monthNames[dateObj.getUTCMonth()]; //months from 1-12
        const dayName = days[dateObj.getDay()];
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const monthyear = `${month} ${year}`;
        this.setState({
            dayName : dayName,
            monthyear: monthyear,
            day: day
        })
    }

    componentDidMount(){
        this.date();
    }
    
    render() {
        return (
        <View style={{flex: 1,backgroundColor: '#131212'}}>
            <View style={{flex: 2,flexDirection: 'row'}}>
                <View style={{height:81, width:65,marginLeft:27,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Gotham_Medium',fontSize: 70,color: 'white'}}>{this.state.day}</Text>                
                </View>
                <View style={{height:81, width:130,justifyContent: 'center',flexDirection: 'column'}}>                
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:24,marginLeft:5,color: 'white'}}>{this.state.dayName}</Text>
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:24,marginLeft:5,color: 'white'}}>{this.state.monthyear}</Text>
                </View>
                <View style={{ height:81, width:173}}>

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
                <ScrollView horizontal={true}>
                {this.state.books.map((value)=>{
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
                <ScrollView horizontal={true}>
                {this.state.books.map((value)=>{
                    return(
                    <View key={value}>
                        <Card data={value} navigation={this.props.navigation}/>
                    </View>
                    )
                    })}
                </ScrollView>
            </View>
        </View>
        )
    }
}

export default Home;