
import React from 'react';

import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';



type RegisterTypeScreenProps = {

  navigation: StackNavigationProp<any>;

};



export default function RegisterTypeScreen({ navigation }: RegisterTypeScreenProps) {

  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text>Register Type Screen</Text>

    </View>

  );

}

