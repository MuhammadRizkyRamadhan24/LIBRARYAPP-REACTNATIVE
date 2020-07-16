import React, {Component} from 'react';
import { View ,Image ,Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import KeyboardListener from 'react-native-keyboard-listener';

import styles from '../styles/Auth-style';
import background from '../public/images/auth-background.jpg';
import logo from '../public/images/logo-auth.png';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        keyboardOpen: ''
    };
  }

  _onPressButton = () => {
    console.log('Login');
  }

  _onKeyboardWillShow = () => {
    this.setState({
      keyboardOpen: 'open'
    });
    console.log(this.state.keyboardOpen)
  }

  _onKeyboardWillHide = () => {
    this.setState({
      keyboardOpen: 'close'
    });
    console.log(this.state.keyboardOpen)
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
              <Item floatingLabel last>
                <Label style={styles.formLabel}>Username</Label>
                <Input style={styles.formInput}/>
              </Item>
              <Item floatingLabel last>
                <Label style={styles.formLabel}>Password</Label>
                <Input secureTextEntry={true} style={styles.formInput}/>
              </Item>
              <Button style={styles.button} block onPress={()=> this.props.navigation.navigate('Home')}>
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

export default Login