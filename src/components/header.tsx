import React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icons from '../../assets/icons';
import useStyles from '../styles/components/header';

interface HeaderProps {
  isPop?: boolean;
  title: string;
  icon?: React.ReactNode | JSX.Element;
}

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  const {title, isPop = false, icon} = props;
  const styles = useStyles();

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
        {icon}
      </View>
    </>
  );
};

export default Header;
