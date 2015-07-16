let React = require('react-native');
let Badge = require('./Badge');
let Separator = require('./Helpers/Separator');

let {
  View,
  Text,
  StyleSheet,
  ScrollView
} = React;

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

class Profile extends React.Component {
  render() {
    let userInfo = this.props.userInfo;
    let topics = ['location', 'numConnections', 'industry', 'summary', 'emailAddress'];
    let list = topics.map((item, index) => {
      let content = userInfo[item];
      if (!content) {
        return null;
      }

      if ('location' === item) {
        content = content.name;
      }

      return (
        <View key={ index }>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{ item[0].toUpperCase() + item.slice(1) }</Text>
            <Text style={styles.rowContent}>{ content }</Text>
          </View>
          <Separator />
        </View>
      );
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    );
  }
}

module.exports = Profile;
