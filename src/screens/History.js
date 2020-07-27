import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base'
import Card from '../components/cardHistory';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
            <View style={{flex: 1,backgroundColor: '#131212'}}>
                <View style={{flex: 3,marginHorizontal:27,justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                    <MaterialIcons name='account-circle' color='white' size={120} />
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:30,color:'white',marginTop:10}}>{this.props.auth.data.username}</Text>
                    {this.props.auth.data.role == 1
                    ?
                    <Text style={{fontFamily:'SanFranciscoPro',fontSize:24,color:'white',marginTop:10,color:'#34C759'}}>admin</Text>
                    :
                    <Text style={{fontFamily:'SanFranciscoPro',fontSize:24,color:'white',marginTop:10,color:'#34C759'}}>user</Text>
                    }
                </View>
                <View style={{flex: 1,marginHorizontal:27,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontFamily:'Gotham_Medium',fontSize:30,color:'white'}}>History</Text>
                    <TouchableOpacity onPress={this.refresh}><MaterialIcons name='refresh' color='white' size={25}/></TouchableOpacity>
                </View>

                {this.state.isLoading
                ?
                <View style={{flex: 5,marginHorizontal:27,justifyContent:'center',alignItems:'center'}}>
                    <Spinner color='white' />
                </View>
                :
                <View style={{flex: 5,marginHorizontal:27}}>
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
            </View>
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