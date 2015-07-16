let React = require('react-native');
let Profile = require('./Profile');

let {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} = React;

let styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component {
  goToProfile() {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {
        userInfo: this.props.userInfo
      }
    });
  }

  makeButtonBackground() {
    return {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#48BBEC'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.userInfo.pictureUrls.values[0] }}
          style={styles.image}
        />
        <TouchableHighlight
        style={this.makeButtonBackground()}
          onPress={this.goToProfile.bind(this)}
          underlayColor="#88D4F5"
        >
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Dashboard;
