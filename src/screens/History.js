import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Spinner } from 'native-base';
import Card from '../components/cardHistory';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import background from '../public/images/background.jpg';

import { connect } from 'react-redux';
import { getAllHistory } from '../redux/actions/borrow';

class History extends Component {
    constructor(props) {
        super(props)
        this.state ={
            history: [],
            isLoading:true
        }
    }

    getHistory = () => {
        const token = this.props.auth.data.token;
        const Username = this.props.auth.data.username;
        this.props
        .getAllHistory(token, Username)
        .then(()=>{
            this.setState({
                history : this.props.borrow.data,
                isLoading: false,
            })
        });
    }

    refresh = async () => {
        await this.setState({isLoading: true})
        const token = this.props.auth.data.token;
        const Username = this.props.auth.data.username;
        this.props
        .getAllHistory(token, Username)
        .then(()=>{
            this.setState({
                history : this.props.borrow.data,
                isLoading: false,
            })
        });
    }

    componentDidMount(){
        this.getHistory();
    }

    render() {
        return (
            <ImageBackground source={background} style={{flex: 1,backgroundColor: '#131212'}}>
                <View style={{flex: 1,marginHorizontal:27,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:30,color:'white'}}>History</Text>
                    <TouchableOpacity onPress={this.refresh}><MaterialIcons name='refresh' color='white' size={25}/></TouchableOpacity>
                </View>
                {this.state.isLoading
                ?
                <View style={{flex: 9,marginHorizontal:27,justifyContent:'center',alignItems:'center'}}>
                    <Spinner color='white' />
                </View>
                :
                <View style={{flex: 9,marginHorizontal:27}}>
                    <ScrollView>
                        {this.state.history.map((value)=>{
                        return(
                        <View key={value}>
                            <Card data={value}/>
                        </View>
                        )
                        })}
                    </ScrollView>
                </View>
                } 
            </ImageBackground>
        )
    }
}


const mapStateToProps = state =>({
    auth: state.auth,
    books: state.books,
    borrow: state.borrow
});

const mapDispatchToProps = { getAllHistory };

export default connect(mapStateToProps,mapDispatchToProps)(History);