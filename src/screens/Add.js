import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Picker, TextInput, ImageBackground, Image, StyleSheet , ToastAndroid} from 'react-native';
import { Form, Item, Input, Button , Toast } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import background from '../public/images/auth-background.jpg';

import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import { addBook } from '../redux/actions/books';
import { getAllAuthor } from '../redux/actions/author';
import { getAllGenre } from '../redux/actions/genre';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            authors: [],
            title: '',
            description: '',
            status: 'Ada',
            author: '',
            genre: '',
            image: null,
            selected: undefined,
        };
      }

    onSelectedGenre = (itemValue, itemIndex) =>{
        this.setState({genre: itemValue})  
    }
    onSelectedAuthor = (itemValue, itemIndex) =>{
        this.setState({author: itemValue}) 
    }

    getDataAuthor = () => {
        const token = this.props.auth.data.token
        this.props.getAllAuthor(token).then(() => {
            this.setState({authors: this.props.author.data});
        })
       }
       
    getDataGenre = () => {
        const token = this.props.auth.data.token
        this.props.getAllGenre(token).then(() => {
            this.setState({genres: this.props.genre.data});
        })
       }

    handleBrowseImage = () => {
        const options = {
          noData: true,
          title: 'Select Image',
        };
    
    ImagePicker.showImagePicker(options, (response) => {
        if (response.uri) {
            this.setState({image: response});
          }
        });
    };

    handlePostAddBook = () => {
        let formdata = new FormData();
        const token = this.props.auth.data.token;
        formdata.append('title', this.state.title);
        formdata.append('description', this.state.description);
        formdata.append('id_author', this.state.author);
        formdata.append('id_genre', this.state.genre);
        formdata.append('status', this.state.status);
        formdata.append('bookImage', {
          name: this.state.image.fileName,
          uri: this.state.image.uri,
          type: this.state.image.type,
        });
        this.props
          .addBook(formdata, token)
          .then(async (res) => {
            console.log(res);
            ToastAndroid.showWithGravity(
                "Add book success",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            this.props.navigation.navigate('Dashboard');
          })
          .catch((err) => {
            console.warn(JSON.stringify(err));
            Toast.show({
              text: err.message,
              type: 'danger',
              position: 'bottom',
            });
          });
      };
    
      componentDidMount(){
        this.getDataAuthor();
        this.getDataGenre();
      };

    render() {
        return (
            <ImageBackground source={background}  style={{flex: 1,backgroundColor: '#131212'}}>
                <View style={{height:77,backgroundColor:'black',flexDirection: 'row'}}>
                    <View style={{height:77,width:81,marginLeft:27,justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}><MaterialIcons color='white' name='arrow-back' size={24} /></TouchableOpacity>
                    </View>
                    <View style={{height:77,width:207,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily: 'Gotham_Medium',fontSize:26,color:'white'}}>Add Data</Text>
                    </View>
                </View>
                <View style={{flex: 9,marginHorizontal:27,justifyContent:'center'}}>
                    <Form style={{backgroundColor:'rgba(0, 0, 0, 0.5)',borderRadius:32,borderWidth:10,borderColor:'rgba(0, 0, 0, 0.5)'}}>
                        <Item last>
                            <Input onChangeText={(val) => this.setState({title: val})} style={{color: '#FFF',fontFamily: 'SanFranciscoPro',fontSize: 18}} placeholder='Title' placeholderTextColor='white'/>
                        </Item>
                        <Item last>
                            <Text style={{color: '#FFF',fontFamily: 'SanFranciscoPro',fontSize: 18}}>  Author</Text>
                            <Picker
                                selectedValue={this.state.author}
                                style={{ height: 50, width: '90%', color:'white',fontFamily: 'SanFranciscoPro'}}
                                onValueChange={this.onSelectedAuthor}
                            >
                                {this.state.authors.map((author) => (
                                <Picker.Item
                                    key={author.id_author}
                                    label={author.author}
                                    value={author.id_author}
                                />
                                ))}
                            </Picker>
                        </Item>
                        <Item last>
                        <Text style={{color: '#FFF',fontFamily: 'SanFranciscoPro',fontSize: 18}}>  Genre  </Text>
                            <Picker
                                selectedValue={this.state.genre}
                                style={{ height: 50, width: '100%', color:'white'}}
                                onValueChange={this.onSelectedGenre}
                            >
                                {this.state.genres.map((genre) => (
                                <Picker.Item
                                    key={genre.id_genre}
                                    label={genre.genre}
                                    value={genre.id_genre}
                                />
                                ))}
                            </Picker>
                        </Item>
                        <Item last>
                            <TextInput

                            onChangeText={(val) => this.setState({description: val})}

                            style={{height: '100%',width:'100%',textAlignVertical: 'top',color:'white',fontFamily: 'SanFranciscoPro',fontSize:18}}
                            underlineColorAndroid="transparent"
                            placeholder="Description"
                            placeholderTextColor="white"
                            numberOfLines={5}
                            multiline={true}
                            />
                        </Item>

                        <TouchableOpacity
                            style={{alignSelf: 'center'}}
                            onPress={() => this.handleBrowseImage()}>
                            <View style={{width: 150,height: 230,borderRadius: 16,overflow: 'hidden',}}>
                                {this.state.image ? (
                                <Image
                                    source={{
                                    uri: this.state.image.uri,
                                    }}
                                    style={{flex: 1,width: undefined,height: undefined}}
                                />
                                ) : (
                                <View style={{flex: 1,width: undefined,height: undefined,justifyContent: 'center',borderWidth: 1}}>
                                    <Text style={{fontFamily: 'SanFranciscoPro',fontSize:18,color: 'white', alignSelf: 'center'}}>
                                    Browse Image
                                    </Text>
                                </View>
                                )}
                            </View>
                        </TouchableOpacity>

                        <Button onPress={() => this.handlePostAddBook()} style={{width:'100%',backgroundColor:'#34C759',borderRadius:30, marginTop:20}} block>
                            <Text style={{fontFamily: 'SanFranciscoPro',fontSize:20,color:'#FFF' }}>Add Book</Text>
                        </Button>
                    </Form>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    books: state.books,
    author: state.author,
    genre: state.genre
});

const mapDispatchToProps = { addBook, getAllAuthor, getAllGenre};

export default connect(mapStateToProps,mapDispatchToProps)(Add);

const styles = StyleSheet.create({
    bookImage: {
      width: 150,
      height: 230,
      borderRadius: 16,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
    browseImage: {
      flex: 1,
      width: undefined,
      height: undefined,
      justifyContent: 'center',
      borderWidth: 1,
    },
  });