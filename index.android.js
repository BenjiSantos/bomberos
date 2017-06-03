/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 const URL = 'https://api.github.com/repos/facebook/react-native';
 const React = require('react');
 const ReactNative = require('react-native');
 const {
   ScrollView,
   StyleSheet,
   RefreshControl,
   Text,
   TouchableWithoutFeedback,
   View,
   Image
 } = ReactNative;

 import { AppRegistry } from 'react-native';

 class Row extends React.Component {
   _onClick = () => {
     this.props.onClick(this.props.data);
   };

   render() {
     return (
      <TouchableWithoutFeedback onPress={this._onClick} >
         <View style={styles.row}>

           <Image source={require('./images/emergencia-medica.png')} style={{width: 50, height: 50}}/>
           <Text style={styles.text}>
             {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
           </Text>
           <Text style={styles.address}>
             'AV. CERRO CAMACHO 880 SANTIAGO DE SURCO'
           </Text>
           <Text>
             'Estado: Atendiendo'
           </Text>
           <Text>
             ' 03/06/2017 09:53:42 a.m.'
           </Text>

         </View>
       </TouchableWithoutFeedback>
     );
   }
 }

export default class bomberos extends React.Component {
  static title = '<RefreshControl>';
  static description = 'Adds pull-to-refresh support to a scrollview.';

  state = {
    isRefreshing: false,
    loaded: 0,
    stars: '?',
    rowData: Array.from(new Array(2)).map(
      (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
  };

  _onClick = (row) => {
    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  };

  componentDidMount() {
    this.fetchData().done()
  }
  /**
   * Get firefighters data in json format.
   */
  async fetchData() {
    const response = await fetch(URL)
    const json = await response.json()
    const stars = json.stargazers_count
    this.setState({stars})
  }

  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick}/>;
    });
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Cargando..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        <Text>
          YOOO
          React Native has {this.state.stars} stars
        </Text>
        {rows}
      </ScrollView>
    );
  }

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 2 items
      const rowData = Array.from(new Array(2))
      .map((val, i) => ({
        text: 'Filas cargadas ' + (+this.state.loaded + i),
        clicks: 0,
      }))
      .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  };
}

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    padding: 20,
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },
  scrollview: {
    flex: 1,
  },
  address: {
    color: 'red',
  }
});

AppRegistry.registerComponent('bomberos', () => bomberos);
