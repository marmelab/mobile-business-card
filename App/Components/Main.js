let React = require('react-native');
let api = require('../Utils/api');
let Dashboard = require('./Dashboard');

let {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      isLoading: false,
      error: false
    };
  }

  handleChange(event) {
    this.setState({
      fullname: event.nativeEvent.text
    });
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true
    });

    api.getProfile().then(res => {
      if ('j' !== this.state.fullname) {
        this.setState({
          error: 'User not found',
          isLoading: false
        });

        return;
      }

      this.props.navigator.push({
        title: res.formattedName,
        component: Dashboard,
        passProps: {
          userInfo: res
        }
      });

      this.setState({
        fullname: '',
        isLoading: false,
        error: false
      });
    });
  }

  render() {
    let showError = this.state.error ? <Text>{this.state.error}</Text> : null;

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a LinkedIn User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
            <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large"
        />
        {showError}
      </View>
    );
  }
}

module.exports = Main;
