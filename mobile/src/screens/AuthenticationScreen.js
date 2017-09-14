import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import SignupForm from '../components/SignupForm';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.SECONDARY};
  position: relative;
`;

const ButtonSignupText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWidth: bold;
  fontSize: 20;
`;

const ButtonSignup = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  height: 75;
  width: 150;
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  position: absolute;
  right: 0;
  top: 30%;
  borderTopLeftRadius: 20;
  borderBottomLeftRadius: 20;
  shadowOpacity: 0.4;
  shadowRadius: 5;
  shadowOffset: 0px 4px;
  shadowColor: #000;
  elevation: 2;
`;

const ButtomTextContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 200;
  justifyContent: center;
  alignItems: center;
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 }
})`
  justifyContent: center;
  alignItems: center;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWidth: 400;
  fontSize: 16;
`;

const initialState = {
  showSignupForm: false,
  showLoginForm: false
};

class AuthenticationScreen extends Component {
  state = initialState;

  _onShowSignupPress = () => this.setState({showSignupForm: true});

  _onBackPress = () => this.setState({ ...initialState });

  render() {
    if (this.state.showSignupForm) {
      return (
        <Root>
          <SignupForm onBackPress={this._onBackPress} />
        </Root>
      )
    }

    return (
      <Root>
        <ButtonSignup onPress={this._onShowSignupPress}>
          <ButtonSignupText>
            Get Started
          </ButtonSignupText>
        </ButtonSignup>
        <ButtomTextContainer>
          <Button>
            <ButtonText>
              Already have an account?
            </ButtonText>
          </Button>
        </ButtomTextContainer>
      </Root>
    );
  }
}

export default AuthenticationScreen;
