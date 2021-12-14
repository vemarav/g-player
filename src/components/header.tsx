import React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icons from '../../assets/icons';
import applyStyles from '../styles/components/header';

interface HeaderProps {
  isPop?: boolean;
  title: string;
}

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  const {title, isPop = false} = props;
  const styles = applyStyles();

  return (
    <>
      <StatusBar backgroundColor={styles.barColor} barStyle={styles.barStyle} />
      <View style={styles.border}>
        {isPop ? (
          <TouchableOpacity onPress={navigation.goBack}>
            <Icons.Back {...styles.backIcon} />
          </TouchableOpacity>
        ) : null}

        <Text
          style={styles.header}
          numberOfLines={1}
          onPress={isPop ? navigation.goBack : undefined}>
          {title}
        </Text>
      </View>
    </>
  );
};

export default Header;
