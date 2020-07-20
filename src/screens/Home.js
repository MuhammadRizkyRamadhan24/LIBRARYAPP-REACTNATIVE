import React, { Component } from 'react';
import Card from '../components/card'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { latestBooks,newArrivals } from '../redux/actions/books';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            monthyear: null,
            day: null,
            dayName: null,
            bookNew: [],
            bookOld: []
        }
    }

    newArrivals = () => {
        const token = this.props.auth.data.token;
        console.log(this.props.auth,'auth');
        this.props
        .newArrivals(token)
        .then(()=>{
            this.setState({
                bookNew : this.props.books.dataNew
            })
            console.log(this.props.books,'data')
        });
    }

    latestBooks = () => {
        const token = this.props.auth.data.token;
        console.log(this.props.auth,'auth');
        this.props
        .latestBooks(token)
        .then(()=>{
            this.setState({
                bookOld : this.props.books.dataOld
            })
            console.log(this.props.books,'data')
        });
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
        this.newArrivals();
        this.latestBooks();
    }
    
    render() {
        console.log(this.props)
        return (
        <View style={{flex: 1,backgroundColor: '#131212'}}>
            <View style={{flex: 2,flexDirection: 'row'}}>
                <View style={{height:81, width:80,marginLeft:27,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Gotham_Medium',fontSize: 70,color: 'white'}}>{this.state.day}</Text>                
                </View>
                <View style={{height:81, width:130,justifyContent: 'center',flexDirection: 'column'}}>                
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:24,marginLeft:5,color: 'white'}}>{this.state.dayName}</Text>
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:24,marginLeft:5,color: 'white'}}>{this.state.monthyear}</Text>
                </View>
                <View style={{height:81, width:159,justifyContent:'flex-end', alignItems:'center',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddBook')}><MaterialIcons name='collections-bookmark' color='white' size={30} /></TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 15}}><MaterialIcons name='settings' color='white' size={30} /></TouchableOpacity>
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
        </View>
        )
    }
}
const mapStateToProps = state =>({
    auth: state.auth,
    books: state.books
});

const mapDispatchToProps = { latestBooks,newArrivals };

export default connect(mapStateToProps,mapDispatchToProps)(Home);

// export default Home;