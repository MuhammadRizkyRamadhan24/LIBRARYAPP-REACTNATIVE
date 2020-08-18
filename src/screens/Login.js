import React, {Component} from 'react';
import { View ,Image ,Text, ImageBackground, TouchableOpacity, ToastAndroid } from 'react-native';
import { Form, Item, Input, Label, Button , Toast } from 'native-base';
import KeyboardListener from 'react-native-keyboard-listener';

import styles from '../styles/Auth-style';
import background from '../public/images/background.jpg';
import logo from '../public/images/logo-auth.png';

import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        keyboardOpen: '',
        username: '',
        password: '',
        showToast: false
    };
  }

  loginUser = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props
      .login(data)
      .then((res) => {
        if(this.props.auth.isLoading == true){
          return(
            <View style={{flex: 1,backgroundColor: '#131212',justifyContent:'center',alignItems:'center'}}>
                <Spinner color='white' />
            </View>
          )
        } else {
          ToastAndroid.showWithGravity(
            "Login success",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
          return this.goToDashboard();
        }
        })
        .catch((err) => {
        console.log(err);
        ToastAndroid.showWithGravity(
          "Username or password is invalid",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        });
  };

  goToDashboard = () =>{
    this.props.navigation.navigate('Dashboard');
  }

  _onKeyboardWillShow = () => {
    this.setState({
      keyboardOpen: 'open'
    });
  }

  _onKeyboardWillHide = () => {
    this.setState({
      keyboardOpen: 'close'
    });
  }

  render() {
    return (
    <ImageBackground source={background} style={styles.background}>
      <KeyboardListener
        onDidShow={this._onKeyboardWillShow}
        onDidHide={this._onKeyboardWillHide}
      />
      {this.state.keyboardOpen == 'open'
      ? 
      <View style={styles.wrapperLogo}>
      <View style={styles.logo}>
        <Image source={logo} style={styles.logoOpen}></Image>
      </View>
      </View>
      : 
      <View style={styles.wrapperLogo}>
        <View style={styles.logo}>
          <Image source={logo} style={styles.logoClose}></Image>
        </View>
      </View>
      }

      <View style={styles.wrapperForm}>
        <Text style={styles.formTitle}>Login</Text>
        <View style={styles.formBox}>
            <Form style={styles.form}>
              <Item last>
                <Label style={styles.formLabel}>Username</Label>
                <Input value={this.state.username} onChangeText={(val) => this.setState({username: val})} style={styles.formInput}/>
              </Item>
              <Item last>
                <Label style={styles.formLabel}>Password </Label>
                <Input value={this.state.password} onChangeText={(val) => this.setState({password: val})} secureTextEntry={true} style={styles.formInput}/>
              </Item>
              <Button style={styles.button} block onPress={this.loginUser}>
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </Form>
        </View>
      </View>

      <View style={styles.wrapperOnpress}>
        <Text style={styles.onpressText}>Dont have an account yet?</Text>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')}><Text style={styles.onpressTouch}>Signup</Text></TouchableOpacity>
      </View>
    </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login