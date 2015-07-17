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
  NetInfo,
  AsyncStorage,
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
      error: false,
      isConnected: null
    };
  }

  componentDidMount() {
    this.boundedHandleConnectivityChange = this.handleConnectivityChange.bind(this);
    NetInfo.isConnected.addEventListener('change', this.boundedHandleConnectivityChange);

    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ isConnected });
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.boundedHandleConnectivityChange);
  }

  handleConnectivityChange(isConnected) {
    this.setState({ isConnected });
  }

  handleChange(event) {
    this.setState({
      fullname: event.nativeEvent.text
    });
  }

  goToProfile(profile) {
    AsyncStorage
      .setItem('@MobileBusinessCard:' + this.state.fullname, JSON.stringify(profile))
      .done();

    this.setState({
      fullname: '',
      isLoading: false,
      error: false
    });

    this.props.navigator.push({
      title: profile.formattedName,
      component: Dashboard,
      passProps: {
        userInfo: profile
      }
    });
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true
    });

    if ('_CC_' === this.state.fullname) {
      AsyncStorage
        .getAllKeys()
        .then(keys => {
          if (keys) {
            keys.filter(key => 0 === key.indexOf('@MobileBusinessCard:'));
          }

          return keys;
        })
        .then(keys => {
          if (keys) {
            AsyncStorage.multiRemove(keys).done();
          }
        })
        .done();

      this.setState({
        error: 'Cache cleared',
        isLoading: false
      });

      return;
    }

    if (!this.state.isConnected) {
      AsyncStorage
        .getItem('@MobileBusinessCard:' + this.state.fullname)
        .then(value => {
          if (value) {
            return this.goToProfile(JSON.parse(value));
          }

          this.setState({
            error: 'User not found',
            isLoading: false
          });
        })
        .catch(error => {
          this.setState({
            error: 'AsyncStorage error: ' + error.message,
            isLoading: false
          });
        })
        .done();

      return;
    }

    api.getProfile(this.state.fullname)
      .then(profile => {
        this.goToProfile(profile);
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isLoading: false
        });
      });
  }

  render() {
    let showError = this.state.error ? <Text>{this.state.error}</Text> : null;

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.fullname}
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
