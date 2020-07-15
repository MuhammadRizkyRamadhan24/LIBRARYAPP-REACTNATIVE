import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

class Login extends Component {
  render() {
    return (
      <Container>
        {/* <Header /> */}
        {/* <Content> */}
          <Form>
            <Item floatingLabel>
              <Label style={style.title}>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        {/* </Content> */}
      </Container>
    );
  }
}

export default Login