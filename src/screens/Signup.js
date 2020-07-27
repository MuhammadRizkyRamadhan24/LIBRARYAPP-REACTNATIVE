import React, {Component} from 'react';
import { View ,Image ,Text, ImageBackground, TouchableOpacity, ToastAndroid } from 'react-native';
import { Form, Item, Input, Label, Button, Toast } from 'native-base';
import KeyboardListener from 'react-native-keyboard-listener';

import { connect } from 'react-redux';
import { register } from '../redux/actions/auth';

import styles from '../styles/Auth-style';
import background from '../public/images/auth-background.jpg';
import logo from '../public/images/logo-auth.png';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
        keyboardOpen: '',
        username:'',
        password:'',
        role: 0,
        showToast: false,
    };
  }

  signupUser = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role
    };
    this.props
      .register(data)
      .then((res) => {
        ToastAndroid.showWithGravity(
          "Register Success",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        return this.goToLogin();
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.showWithGravity(
          "Register Failed",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      });
  };

  goToLogin = () =>{
    this.props.navigation.navigate('Login');
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
      <View style={{flex: 2}}>
        <View style={styles.logo}>
          <Image source={logo} style={styles.logoClose}></Image>
        </View>
      </View>
      }

      <View style={styles.wrapperForm}>
        <Text style={styles.formTitle}>Signup</Text>
        <View style={styles.formBox}>
            <Form style={styles.form}>
              <Item>
                <Label style={styles.formLabel}>Username</Label>
                <Input value={this.state.username} onChangeText={(val) => this.setState({username: val})} style={styles.formInput}/>
              </Item>
              <Item>
                <Label style={styles.formLabel}>Password</Label>
                <Input value={this.state.password} onChangeText={(val) => this.setState({password: val})} secureTextEntry={true} style={styles.formInput}/>
              </Item>
              <Button style={styles.button} block onPress={this.signupUser}>
                <Text style={styles.buttonText}>Signup</Text>
              </Button>
            </Form>
        </View>
      </View>

      <View style={styles.wrapperOnpress}>
        <Text style={styles.onpressText}>Have an account yet?</Text>
        <TouchableOpacity onPress={this.goToLogin}><Text style={styles.onpressTouch}>Login</Text></TouchableOpacity>
      </View>
    </ImageBackground>
    );
  }
}

// export default Signup

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {register};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);