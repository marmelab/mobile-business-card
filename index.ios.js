let React = require('react-native');
let {
  StyleSheet,
  NavigatorIOS,
  AppRegistry,
} = React;
let Main = require('./App/Components/Main');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

class MobileBusinessCard extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Mobile Business Card',
          component: Main
        }}
      />
    );
  }
}

AppRegistry.registerComponent('MobileBusinessCard', () => MobileBusinessCard);
