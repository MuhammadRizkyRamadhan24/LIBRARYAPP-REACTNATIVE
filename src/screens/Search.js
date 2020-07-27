import React, { Component } from 'react'
import { View, ScrollView, TextInput, Text, ToastAndroid} from 'react-native';
import { Item, Input } from 'native-base';
import Card from '../components/cardSearch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { getSearch } from '../redux/actions/books';

class Search extends Component {
    constructor(props){
        super(props);
        this.state ={
            page:1,
            books:[],
            spinnerLoading:false,
            isLoading:true,
            refresh:false,
            content:false
        }
    }

    handleChange = (val) =>{
        this.setState({
            search: val
        });
    }
    

    search = async() => {
        await this.setState({content: true,page: 1});
        const token = this.props.auth.data.token;
        const search = this.state.search;
        const page = this.state.page;
        this.props
        .getSearch(token, search, page)
        .then(()=>{
            this.setState({
                books : this.props.books.data,
                isLoading: false,
                spinnerLoading: false,
            })
        })
        .catch((err) => {
            console.log(err.response,'hhedbv');
            ToastAndroid.showWithGravity(
                "Not Find Data",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            this.setState({isLoading: false, spinnerLoading: false});
        });
    }

    infiniteSearch =  () => {
        this.setState({content: true})
        const token = this.props.auth.data.token;
        const search = this.state.search;
        const page = this.state.page;
        this.props
        .getSearch(token, search, page)
        .then(()=>{
            this.setState({
                books : this.state.books.concat(this.props.books.data),
                isLoading: false,
                spinnerLoading: false,
            })
        })
        .catch((err) => {
            console.log(err.response);
            this.setState({isLoading: false, spinnerLoading: false});
        });
    }

    handleLoadMore = () => {
        this.setState(
          {
            page: this.state.page + 1,
            spinnerLoading: true,
          },() => {
            this.infiniteSearch();
        },
      );
    };

    // componentDidUpdate(prevState){
    //     if(prevState.search !== this.state.search){
    //         this.setState({
    //             page: 1
    //         })
    //     }
    // }

    render() {
        const isCloseToBottom = ({
            layoutMeasurement,
            contentOffset,
            contentSize,
        }) => {
            const paddingToBottom = 20;
            return (
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom
            );
        };
        return (
            <View style={{flex: 1,backgroundColor: '#131212'}}>
                <View style={{height:77,justifyContent:'center',alignItems:'center'}}>
                    <Item rounded style={{height:50,width:370}}>
                        <MaterialIcons style={{marginLeft:15}} color='white' name='search' size={24} />
                        <TextInput onChangeText={this.handleChange} onSubmitEditing={() => this.search()} style={{color:'white',fontFamily:'SanFranciscoPro',width:'80%'}} placeholder='Search' placeholderTextColor='white'/>
                    </Item>
                </View>
                {this.state.content 
                ?
                <View style={{flex: 9,marginHorizontal:27}}>
                    <ScrollView showsVerticalScrollIndicator={false} onScroll={({nativeEvent}) => {if (isCloseToBottom(nativeEvent)){this.handleLoadMore()}}}scrollEventThrottle={400}>
                    <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
                    {this.state.books.map((value)=>{
                            return(
                            <View  key={value}>
                                <Card data={value} navigation={this.props.navigation}/>
                            </View>
                            )
                            })}
                    </View>
                    </ScrollView>
                </View>
                :
                <View style={{flex: 1,marginHorizontal:27,justifyContent:'center',alignItems:'center'}}>
                    <MaterialIcons style={{marginLeft:15}} color='white' name='search' size={100} />
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:24,color:'white',marginVertical:20}}>What are you looking for?</Text>
                </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    books: state.books
});

const mapDispatchToProps = { getSearch };

export default connect(mapStateToProps,mapDispatchToProps)(Search);