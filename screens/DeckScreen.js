import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Jobs',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="description" size={30} color={tintColor} />
    };
  };

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.title}>
        <View style={{ height: 150 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
          <View style={styles.detailWrapper}>
            <View>
              <Text>{job.company}</Text>
            </View>
          </View>
        <View>
          <Text>{job.created_at}</Text>
        </View>
        <View>
          <Text>{job.location}</Text>
        </View>
        <Text>
          {job.description.replace(/<li>/g, '').replace(/<\/b>/g,'').replace(/<p>/g,'').replace(/<\/p>/g,'').replace(/<strong>/g,'').replace(/<\/strong>/g,'').slice(0, 250)}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: "my-location" }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRigth={job => this.props.likeJob(job)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}

const mapStateToProps = ({ jobs }) => {
  console.log('log from mapStateToProps', jobs);
  return { jobs: jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);
