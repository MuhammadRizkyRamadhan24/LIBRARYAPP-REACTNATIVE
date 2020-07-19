import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { getBookById } from '../redux/actions/books';

export class BookDetail extends Component {
    constructor(props){
        super(props);
        this.state ={
            // book:[{
            //     id: 1,
            //     title: '78 Resep MPASI',
            //     author: 'dr. Meta Hanindita, Sp.A',
            //     status: 'Available',
            //     description: 'MPASI harus diberikan saat ASI saja sudah tidak dapat mencukupi kebutuhan nutrisi bayi. Selama periode MPASI, seorang bayi secara perlahan dilatih agar kelak dapat mengonsumsi makanan keluarga. Masa transisi dari ASI eksklusif sampai makanan keluarga ini terjadi saat bayi berusia sekitar 6-23 bulan.',
            //     bookImage: 'https://cdn.gramedia.com/uploads/items/9786020643250_Mommyclopedia_5_78_Resep_MAPASI_C_1_4-1.jpg'
            // }],
            books:[],
        }
        console.log(this.props.route.params.id)
    }

    getBookById = () => {
        const token = this.props.auth.data.token;
        console.log(this.props.auth,'auth');
        const id = this.props.route.params.id
        this.props
        .getBookById(token, id)
        .then(()=>{
            this.setState({
                books : this.props.books.data
            })
            console.log(this.props.books,'data')
        });
    }

    componentDidMount(){
        this.getBookById();
    }

    render() {
        console.log(this.state)
        return (
            <View style={{flex: 1,backgroundColor: '#131212'}}>
                <View style={{flex: 1,flexDirection: 'row',backgroundColor: 'black'}}>
                    <View style={{height:81,width:81,marginLeft:27,justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}><MaterialIcons color='white' name='arrow-back' size={24} /></TouchableOpacity>
                    </View>
                    <View style={{height:81,width:207,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily: 'Gotham_Medium',fontSize:26,color:'white'}}>Detail Book</Text>
                    </View>
                    <View style={{height:81,width:81, justifyContent:'center',alignItems: 'flex-end'}}>
                        <TouchableOpacity><MaterialIcons name='library-books' color='white' size={24} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 8}}>
                    <View style={{flex: 7,justifyContent:'center'}}>
                        <Image source={{uri: `${this.state.books[0].bookImage}`}} style={{height:300,width:null,resizeMode:'contain',borderRadius:15}}></Image>
                    </View>
                    <View style={{flex: 2,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Text style={{fontFamily:'Gotham_Medium',fontSize:25,color:'white'}}>{this.state.books[0].title}</Text>
                        <Text style={{fontFamily:'SanFranciscoPro',fontSize:16,marginTop:20,color: '#838388'}}>{this.state.books[0].author}</Text>
                    </View>
                    <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
                        {this.state.books[0].status == 'Ada' || this.state.books[0].status == 'ada'
                        ?
                        <View style={{height:10,width:100,borderWidth:2,borderRadius:30,backgroundColor:'#34C759'}}/>
                        :
                        <View style={{height:10,width:100,borderWidth:2,borderRadius:30,backgroundColor:'#F6C12D'}}/>
                        }
                    </View>
                    <View style={{flex: 3}}>
                        <Text style={{width:369,marginLeft:27,flex: 1,fontFamily:'SanFranciscoPro',fontSize:18,color:'#838388',textAlign:'justify'}}>{this.state.books[0].description}</Text>
                    </View>
                </View>
                <View style={{flex: 1,justifyContent:"center"}}>
                    {this.state.books[0].status == 'Available' || this.state.books[0].status == 'available'
                    ?
                    <Button style={{width:369,marginLeft:27,backgroundColor:'#34C759',borderRadius:30}} block onPress={()=> this.props.navigation.navigate('Home')}>
                        <Text style={{fontFamily: 'SanFranciscoPro',fontSize:20,color:'white'}}>Borrow</Text>
                    </Button>
                    :
                    <Button style={{width:369,marginLeft:27,backgroundColor:'#F6C12D',borderRadius:30}} block disabled={true} onPress={()=> this.props.navigation.navigate('Home')}>
                        <Text style={{fontFamily: 'SanFranciscoPro',fontSize:20,color:'#838388'}}>Borrowed</Text>
                    </Button>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    books: state.books
});

const mapDispatchToProps = { getBookById };

export default connect(mapStateToProps,mapDispatchToProps)(BookDetail);
