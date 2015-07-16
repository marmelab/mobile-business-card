let React = require('react-native');

let {
  View,
  Text,
  StyleSheet,
  Image,
  PropTypes
} = React;

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#88D4F5',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  headline: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Badge extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.userInfo.avatar }}
          style={styles.image}
        />
        <Text style={styles.name}>{this.props.userInfo.name}</Text>
        <Text style={styles.headline}>{this.props.userInfo.headline}</Text>
      </View>
    );
  }
}

Badge.propTypes = {
  userInfo: PropTypes.object.isRequired
};

module.exports = Badge;
