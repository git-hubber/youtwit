import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import { Platform, Keyboard, AsyncStorage } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import { colors, fakeAvatar } from '../utils/constants';
import SIGNUP_MUTATION from '../graphql/mutations/signup';
import { login } from '../actions/user';

const Root = styled(Touchable).attrs({
  feedback: 'none'
})`
  flex: 1;
  position: relative;
  alignItems: center;
  justifyContent: center;
`;

const Wrapper = styled.View`
  alignSelf: stretch;
  alignItems: center;
  justifyContent: center;
  height: 100%;
`;

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 }
})`
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 5%;
  left: 5%;
  zIndex: 1;
`;

const ButtonConfirm = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  backgroundColor: ${props => props.theme.PRIMARY};
  borderRadius: 10;
  justifyContent: center;
  alignItems: center;
  shadowColor: #000;
  shadowRadius: 5;
  shadowOffet: 0px 2px;
  shadowOpacity: 0.2;
  elevation: 2;
`;

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 600;
`;

const InputWrapper = styled.View`
  height: 50;
  width: 70%;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.LIGHT_GRAY}
  marginVertical: 5;
  justifyContent: flex-end;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
  autoCorrect: false
})`
  color: ${props => props.theme.LIGHT_GRAY};
  height: 30;
  width: 100%;
`;

class SignupForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    username: '',
    loading: false,
  }

  _onOutsidePress = () => Keyboard.dismiss();

  _onChangeText = (type, text) => this.setState({ [type]: text });

  _checkIfDisabled() {
    const {
      fullName,
      email,
      password,
      username
    } = this.state;

    if (!fullName || !email || !password || !username) return true;

    return false;
  }

  _onSignupPress = async () => {
    this.setState({ loading: true });
    const {
      fullName,
      email,
      password,
      username
    } = this.state;
    const avatar = fakeAvatar;

    try {
      const { data } = await this.props.mutate({
        variables: {
          fullName,
          email,
          password,
          username,
          avatar
        }
      });

      await AsyncStorage.setItem('@youtwit', data.signup.token);
      this.setState({ loading: false });
      return this.props.login();
    } catch (error) {
      throw error;
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }

    return (
      <Root onPress={this._onOutsidePress}>
        <BackButton onPress={this.props.onBackPress}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back" />
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input
              placeholder="Full Name"
              autoCapitalize="words"
              onChangeText={text => this._onChangeText('fullName', text)}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => this._onChangeText('email', text)}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this._onChangeText('password', text)}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={text => this._onChangeText('username', text)}
            />
          </InputWrapper>
        </Wrapper>
        <ButtonConfirm
          onPress={this._onSignupPress}
          disabled={this._checkIfDisabled()}
        >
          <ButtonConfirmText>
            Sign Up
          </ButtonConfirmText>
        </ButtonConfirm>
      </Root>
    );
  }
}

export default compose(
  graphql(SIGNUP_MUTATION),
  connect(undefined, { login })
)(SignupForm);
