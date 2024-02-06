import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const dropdownItems = [
    { label: 'To-Do List', value: 'ToDoList' },
    { label: 'Reminders', value: 'Reminders' },
    { label: 'Family Budget', value: 'Budget' },
    { label: 'About Us', value: 'Aboutus' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Signout', value: 'Login' }
  ];

  const gridItems = [
    { label: 'Home', icon: 'home', value: 'HomeServ' },
    { label: 'Knowledge', icon: 'book', value: 'Knowledge' },
    { label: 'Professional', icon: 'briefcase', value: 'Professional' },
    { label: 'Aware', icon: 'info', value: 'Aware' },
    { label: 'Counselling', icon: 'phone-square', value: 'Counselling' },
    { label: 'Vehicle', icon: 'car', value: 'Vehicle' },
    { label: 'Agri/Vet', icon: 'leaf', value: 'Agric' },
    { label: 'Shopping', icon: 'shopping-cart', value: 'Shopping' },
    { label: 'Others', icon: 'commenting', value: 'Others' },
  ];

  const handleIconPress = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item) => {
    setSelectedOption(item.label);
    setDropdownVisible(false);

    if (item.value === 'Login') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else if (item.value === 'Shopping') {
      navigation.navigate('Shopping');
    } else {
      navigation.navigate(item.value);
    }
  };

  const renderDropdown = () => (
    <View style={styles.dropdown}>
      {dropdownItems.map((item) => (
        <TouchableOpacity
          key={item.value}
          style={styles.dropdownItem}
          onPress={() => handleSelect(item)}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderGridItem = ({ item }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => handleSelect(item)}>
      <Icon name={item.icon} size={30} color="#000" style={styles.gridIcon} />
      <Text style={styles.gridLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleIconPress}>
          <Icon
            name={isDropdownVisible ? 'caret-up' : 'caret-down'}
            size={30}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>Username</Text>
      </View>

      {isDropdownVisible && renderDropdown()}

      <FlatList
        data={gridItems}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        style={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  icon: {
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  grid: {
    marginTop: 10,
  },
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
  gridIcon: {
    marginBottom: 5,
  },
  gridLabel: {
    fontSize: 12,
  },
});

export default HomeScreen;
