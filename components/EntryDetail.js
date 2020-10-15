import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommonActions } from "@react-navigation/native";
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions'
import { removeEntry} from '../utils/api'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import TextButton from './TextButton'

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
  shouldComponentUpdate(nextProps) {
    return nextProps.metrics.length !== 0 && !nextProps.metrics[0].today;
  }

  reset = () => {
    const { remove, goBack, entryId } = this.props
    remove()
    goBack()
    removeEntry(entryId)
  }

  render() {
    
    const { metrics, entryId } = this.props
    this.setTitle();
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics[0]} />
        <TextButton onPress={this.reset} style={{margin: 20}}>RESET</TextButton>

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

function mapDispatchToProps(dispatch, { navigation, route }) {
  const { entryId } = route.params;
  return { 
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : new Array()
    })),
    goBack: () => navigation.dispatch(CommonActions.goBack()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)

