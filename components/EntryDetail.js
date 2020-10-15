import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions'
import { removeEntry} from '../utils/api'
import { timeToString, getDailyReminderValue } from '../utils/helpers'

class EntryDetail extends Component {
  setTitle = () => {
    const { entryId } = this.props.route.params

    if(!entryId) return;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    this.props.navigation.setOptions({
      title: `${month}/${day}/${year}`,
    });
  }
  render() {
    console.log('Entry Detail Props: ', this.props)
    const { metrics, entryId } = this.props
    this.setTitle();
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics[0]} />
        <Text>
          Entry Detail - {this.props.route.params.entryId}
        </Text>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
})

function mapStateToProps(entries, { route }) {
  const { entryId } = route.params;
  return {
    entryId,
    metrics: entries[entryId],
  }
}

export default connect(mapStateToProps)(EntryDetail)

