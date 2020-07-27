import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, ToastAndroid } from 'react-native';
import { Button, Spinner } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import background from '../public/images/auth-background.jpg';
import { API_URL } from '@env';

import { connect } from 'react-redux';
import { getBookById, deleteDataById } from '../redux/actions/books';
import { borrowBook } from '../redux/actions/borrow';

export class BookDetail extends Component {
    constructor(props){
        super(props);
        this.state ={
            book:[],
            isLoadingContent: true
        }
    }

    getBook = () => {
        const token = this.props.auth.data.token;
        const id = this.props.route.params.id;
        this.props
        .getBookById(token, id)
        .then(()=>{
            this.setState({
                isLoadingContent: this.props.books.isLoading,
                book : this.props.books.dataById
            })
        });
    }

    deleteBook = () => {
        const token = this.props.auth.data.token
        const id = this.props.route.params.id
        this.props
        .deleteDataById(token, id).then(() => {
                ToastAndroid.showWithGravity(
                "Delete success",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
                )
                return this.goToDashboard();
        });
    }

    borrowBook = () => {
        const title = this.state.book[0].title
        const token = this.props.auth.data.token
        const username = this.props.auth.data.username
        const data = {
            title: title,
            username: username
        }
        this.props
        .borrowBook(token, data).then(() => {
                ToastAndroid.showWithGravity(
                "Borrow success",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
                );
                return this.goToDashboard();
        });
    }

    goToDashboard = () =>{
        this.props.navigation.goBack();
    }

    componentDidMount(){
        this.getBook();
    }

    render() {
        return (
            <>
            {this.state.isLoadingContent
            ?
            <ImageBackground source={background}  style={{flex: 1,backgroundColor: '#131212',justifyContent:'center',alignItems:'center'}}>
                <Spinner color='white' />
            </ImageBackground>
            :
            <View style={{flex: 1,backgroundColor: '#131212'}}>
                <View style={{flex: 1,flexDirection: 'row',backgroundColor: 'black'}}>
                    <View style={{height:77,width:81,marginLeft:27,justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}><MaterialIcons color='white' name='arrow-back' size={24} /></TouchableOpacity>
                    </View>
                    <View style={{height:77,width:207,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily: 'Gotham_Medium',fontSize:26,color:'white'}}>Detail Book</Text>
                    </View>
                    <View style={{backgroundColor:'black' ,height:77,width:81, justifyContent:'flex-end',alignItems: 'center',flexDirection:'row'}}>
                    {this.props.auth.data.role == 1
                    ?
                    <View style={{backgroundColor:'black' ,height:77,width:81, justifyContent:'flex-end',alignItems: 'center',flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditBook',{id: this.props.route.params.id})} style={{marginRight:15}}><MaterialIcons name='library-books' color='white' size={24} /></TouchableOpacity>
                        <TouchableOpacity onPress={this.deleteBook}><MaterialIcons name='delete' color='white' size={24} /></TouchableOpacity>
                    </View>
                    :
                    <View style={{backgroundColor:'black' ,height:77,width:81, justifyContent:'flex-end',alignItems: 'center',flexDirection:'row'}}/>
                    }
                    </View>
                </View>
                <View style={{flex: 8}}>
                    <View style={{flex: 7,justifyContent:'center'}}>
                        <Image source={{uri: API_URL + `static/images/${this.state.book[0].bookImage}`}} style={{height:300,width:null,resizeMode:'contain',borderRadius:15}}></Image>
                    </View>
                    <View style={{flex: 2,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Text style={{fontFamily:'Gotham_Medium',fontSize:25,color:'white',textAlign:'center'}}>{this.state.book[0].title}</Text>
                        <Text style={{fontFamily:'SanFranciscoPro',fontSize:16,marginTop:20,color: '#838388'}}>{this.state.book[0].added_at}</Text>
                    </View>
                    <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
                        {this.state.book[0].status == 'Ada' || this.state.book[0].status == 'ada'
                        ?
                        <View style={{height:10,width:100,borderWidth:2,borderRadius:30,backgroundColor:'#34C759'}}/>
                        :
                        <View style={{height:10,width:100,borderWidth:2,borderRadius:30,backgroundColor:'#F6C12D'}}/>
                        }
                    </View>
                    <View style={{flex: 3}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{width:369,marginLeft:27,flex: 1,fontFamily:'SanFranciscoPro',fontSize:18,color:'#838388',textAlign:'justify'}}>{this.state.book[0].description}</Text>
                        </ScrollView>                        
                    </View>
                </View>
                <View style={{flex: 1,justifyContent:"center"}}>
                    {this.state.book[0].status == 'ada' || this.state.book[0].status == 'Ada'
                    ?
                    <Button onPress={this.borrowBook} style={{width:369,marginLeft:27,backgroundColor:'#34C759',borderRadius:30}} block>
                        <Text style={{fontFamily: 'SanFranciscoPro',fontSize:20,color:'white'}}>Borrow</Text>
                    </Button>
                    :
                    <Button style={{width:369,marginLeft:27,backgroundColor:'#F6C12D',borderRadius:30}} block disabled={true}>
                        <Text style={{fontFamily: 'SanFranciscoPro',fontSize:20,color:'#838388'}}>Borrowed</Text>
                    </Button>
                    }
                </View>
            </View>
            }
            </>  
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    books: state.books,
    borrow: state.borrow
});

const mapDispatchToProps = { getBookById, deleteDataById, borrowBook };

export default connect(mapStateToProps,mapDispatchToProps)(BookDetail);