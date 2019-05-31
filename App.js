import React, { Component } from 'react';
import { StyleSheet, Alert, ScrollView , Image} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import call from 'react-native-phone-call'

import { Container, Header, Content, Button, Text, View, Tab, Tabs, List, ListItem, Left, Body, Right, Thumbnail, Fab, Icon, Picker, Title, Form, Item, Input, Label } from 'native-base';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incidents: [
        {
          title: 'Tanker-fire-i90-exit24',
          priority: 'ios-alert',
          timeDate: '23:22 | 31-May-2019'
        },
        {
          title: 'SUV-stall-I90-exit11',
          priority: 'ios-alert',
          timeDate: '12:53 | 28-May-2019'
        },
        {
          title: 'Runner-I5-exit166',
          priority: 'ios-alert',
          timeDate: '07:22 | 27-May-2019'
        },
      ],
      departments: ['Metro', 'SDOT', 'SFD', 'SPD', 'WSDOT','WSP'],
    }
  }

  render() {

    // Generate list of incidents as Buttons
    let generateIncidents = []
    for(let i = 0; i < this.state.incidents.length; i++) {
      generateIncidents.push(<Button style={styles.btn} block light onPress={() => navigate('IncidentDetails', {incidentTitle: this.state.incidents[i].title})} key={i}>
                              <Text>{this.state.incidents[i].title}</Text>
                              <Icon name={this.state.incidents[i].priority} transparent />
                              <Text style={styles.timeDate}>{this.state.incidents[i].timeDate}</Text>
                            </Button>);
    }
    // Generate list of departments as ListItems
    let generateDepartments = [];
    for(let i = 0; i <  this.state.departments.length; i++) {
      generateDepartments.push(
          <ListItem onPress={() => navigate('DepartmentContacts', {departmentName: this.state.departments[i]})} key={i}>
            <Text>{this.state.departments[i]}</Text>
          </ListItem>
        );
    }

    const {navigate} = this.props.navigation;

    return (
      <Container>
        <Tabs>
          <Tab heading="Incidents">
            <Content padder>
              {generateIncidents}
            </Content>
            <View style={{ flex: 1 }}>
                <Fab
                  style={{ backgroundColor: '#5067FF' }}
                  position="bottomRight"
                  onPress={() => navigate('AddIncident')}>
                  <Icon name="ios-add" />
                </Fab>
              </View>
          </Tab>
          <Tab heading="Department Contacts">
            <Content padder>
              <List>
                {generateDepartments}
              </List>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

class IncidentDetails extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>{navigation.getParam('incidentTitle')} Details</Text>
      </View>
    );
  }
}

class AddIncident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      location: '',
      incidentType: undefined,
      priority: undefined,
      crimeScene: [],
      closedLanes: [false, false, false, false],
    }
  }

  onIncidentTypeChange(value: string) {
    this.setState({
      incidentType: value,
    });
    console.log('incidentType changed');
  }

  onPriorityChange(value: string) {
    this.setState({
      priority: value,
    });
    console.log('priority changed');
  }

  handleCreateIncident() {
    Alert.alert('Created Incident');
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Container>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Location:</Label>
              <Input />
            </Item>
            <Item>
              <Item picker>
                <Label>Type:</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-dropdown" />}
                  placeholder="Select Incident Type"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.incidentType}
                  onValueChange={this.onIncidentTypeChange.bind(this)}
                  >
                  <Picker.Item label='Rear-end Collision' value='0' />
                  <Picker.Item label='Side-impact Collision' value='1' />
                  <Picker.Item label='Sideswipe Collision' value='2' />
                  <Picker.Item label='Rollover Collision' value='3' />
                  <Picker.Item label='Head on Collision' value='4' />
                  <Picker.Item label='Single Car Accident' value='5' />
                  <Picker.Item label='Multiple Vehicle Pile-up' value='6' />
                </Picker>
              </Item>
            </Item>
            <Item>
              <Item picker>
                <Label>Priority:</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-dropdown" />}
                  placeholder="Select Level of Priority"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.priority}
                  onValueChange={this.onPriorityChange.bind(this)}
                  >
                  <Picker.Item label='Low Priority' value='0' />
                  <Picker.Item label='High Priority' value='1' />
                </Picker>
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Crime Scene:</Label>              
              <ScrollView horizontal='true' style={styles.scrollView}>
                <Button rounded light style={styles.scrollViewButton}>
                  <Icon name="ios-nuclear" />
                  <Text>HazMat</Text>
                </Button>
                <Button rounded light style={styles.scrollViewButton}>
                  <Icon name="ios-flame" />
                  <Text>Fire</Text>
                </Button>
                <Button rounded light style={styles.scrollViewButton}>
                  <Icon name="ios-pulse" />
                  <Text>Fatality</Text>
                </Button>
                <Button rounded light style={styles.scrollViewButton}>
                  <Icon name="ios-car" />
                  <Text>Comm. Vehicle</Text>
                </Button>
                <Button rounded light style={styles.scrollViewButton}>
                  <Text>Other</Text>
                </Button>
              </ScrollView>
            </Item>
            <Item stackedLabel>
              <Label>Select Closed Lanes:</Label>              
              <ScrollView horizontal='true' style={styles.scrollView} contentContainerSyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button rounded light style={styles.scrollViewButton}>
                  <Icon name="arrow-round-down" />
                  <Text>South</Text>
                </Button>
                <Button rounded light style={styles.scrollViewButton}>
                  <Icon name="arrow-round-down" />
                  <Text>South</Text>
                </Button>
                <Button rounded light style={styles.scrollViewButton}>
                  <Icon name="arrow-round-up" />
                  <Text>North</Text>
                </Button>
                <Button rounded light style={styles.scrollViewButton}>
                  <Icon name="arrow-round-up" />
                  <Text>North</Text>
                </Button>
              </ScrollView>
            </Item>
          </Form>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => navigate('Home')}>
          <Icon name="ios-send" />
        </Fab>
      </Container>
    );
  }
}

class DepartmentContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [
        {
          thumbnail: 'https://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
          name: 'Jane Doe',
          title: 'Deputy Mobility Manager',
          function: 'Incident and Traffic Ops',
          phone: '2061111111'
        },
        {
          thumbnail: 'https://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
          name: 'John Doe',
          title: 'Media Relations Lead',
          function: 'Media',
          phone: '2062222222'
        },
      ]
    }
  }

  render() {
    let generateContacts = [];
    for(let i = 0; i < this.state.contacts.length; i++) {
      generateContacts.push(
        <ListItem avatar key={i} >
          <Left>
            <Thumbnail source={{ uri: `${this.state.contacts[i].thumbnail}` }} />
          </Left>
          <Body>
            <Text>{this.state.contacts[i].name}</Text>
            <Text note numberOfLines={1}>{`Title: ${this.state.contacts[i].title}`}</Text>
            <Text note numberOfLines={1}>{`Function: ${this.state.contacts[i].function}`}</Text>
          </Body>
          <Right>
            <Button>
              <Icon name='ios-text' />
            </Button>
            <Button onPress={() => {
                    Alert.alert(`${this.state.contacts[i].phone}`);
                    }}>
              <Icon name='ios-call' />
            </Button>
          </Right>
        </ListItem>
      );
    }

    const { navigation } = this.props;

    return (
      <Container>
        <List>
          {generateContacts}
        </List>
      </Container>
    );
  }
}

function callNumber(number) {
  const args = {
  number: number, // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
  }
   
  // call(args).catch(console.error)
}


const styles = StyleSheet.create({
  btn: {
    width: 350,
    height: 80,
    marginTop: 10,
  },
  accordian: {
    borderWidth: 0,
  },
  accordionHeader: {
    height: 80,
    marginTop: 10,
    backgroundColor: '#edebed',
  },
  accordionContent: {
    backgroundColor: '#f5f4f5',
  },
  timeDate: {
    fontSize: 10,
  },
  contact: {
    width: 350,
    height: 80,
    marginTop: 10,
    display: 'none',
  },
  scrollView: {
    marginTop: 10,
    marginBottom: 10,
  },
  scrollViewButton: {
    marginRight: 10,
  }
});


// Main navigation
const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  IncidentDetails: {screen: IncidentDetails},
  AddIncident: {screen: AddIncident},
  DepartmentContacts: {screen: DepartmentContacts},
});

const App = createAppContainer(MainNavigator);

export default App;

