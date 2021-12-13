import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
const HeaderCustomButton = props => {
  return <HeaderButton {...props} IconComponent={Ionicons} />;
};

export default HeaderCustomButton;
