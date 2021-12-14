import React from 'react';
import {View, Modal, StyleSheet, Text, StatusBar, ScrollView} from 'react-native';

import {TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Colors from '../styles/themes/colors';
import applyStyles from '../styles/components/selectionModal';

interface Item {
  title?: string | number;
  language?: string;
  index?: number;
}

export interface SelectionModalProps {
  title?: string;
  width?: number;
  height?: number;
  isVisible: boolean;
  onSelect?: (item?: Item) => void;
  onCancel?: () => void;
  selected?: Item;
  data?: Array<Item>;
  [key: string]: any;
}

const SelectionModal = (props: SelectionModalProps) => {
  const {
    title,
    data = [],
    isVisible = false,
    onSelect = () => {},
    onCancel = () => {},
    width = 300,
    height = 300,
    selected = {},
  } = props;
  const styles = applyStyles();

  const containerSize = {
    width: width * (width > height ? 0.4 : 0.8),
    height: height * (width > height ? 0.7 : 0.5),
  };

  const Option = (item?: Item) => {
    return (
      <TouchableOpacity onPress={() => onSelect(item)} key={`${item?.title}`}>
        <View style={styles.item}>
          <CheckBox
            value={selected?.title === item?.title}
            onValueChange={() => onSelect(item)}
            tintColors={styles.checkbox}
          />
          <Text style={styles.title}>
            {`${item?.language ?? item?.title ?? item?.index ?? 'NONE'}`.toString().toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} statusBarTranslucent={true}>
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.listContainer, containerSize]}>
              {title ? <Text style={styles.header}>{title}</Text> : null}
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}>
                {data.map(item => (
                  <Option key={item.title} {...item} />
                ))}
                {title === 'Playback Speed' ? null : Option()}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SelectionModal;
