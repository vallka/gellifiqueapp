import * as React from 'react';
import { Text, View, StyleSheet,WebView,Button,ActivityIndicator } from 'react-native';
import { Constants } from 'expo';


export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return navigation.getParam('this') && navigation.getParam('this').state.canGoBack? {
      title: navigation.getParam('title1', 'GellifiQue'),
      headerLeft: (
        <Button
        onPress={() => {navigation.getParam('this')._onUnLoaded(),navigation.getParam('this').child.goBack()}}
        title="Back"
        color="#000"
        />  
        )
      } : {
        title: navigation.getParam('title1', 'GellifiQue'),
        }
  };

  /*
  static navigationOptions = {
    title: 'GellifiQue',
    headerLeft: (
      <Button
      onPress={() => {alert(navigation.getParam('title1'))}}
      title="Back"
      color="#000"
      />  
      )
  };
*/

  constructor(){
    super();
    this.state = {
        data: null,
        loading: true,
        error: null,
        canGoBack: false,
    }
  }
  _onLoaded = ()=>{
    //alert(1)
    this.setState({loading:false})
    this.props.navigation.setParams({title1: 'Updated!', this: this})
  }
  _onUnLoaded = ()=>{
    //alert(1)
    this.setState({loading:true})
  }
  _onChange = (state)=>{
    //alert(1)
    //this.setState({loading:true})
    console.log('wchange')
    console.log(state.canGoBack)
    this.setState({canGoBack: state.canGoBack})
    
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView ref={child => {this.child = child}}
          source={{uri: 'https://www.gellifique.co.uk'}}
          style={{margin: 0, width: '100%'}}      
          injectedJavaScript="$('#header').hide()"
          onLoadEnd={this._onLoaded}
          onLoadStart={this._onUnLoaded}
          onNavigationStateChange={this._onChange}
          />
        { this.state.loading && (  
        <View style={{flex: 100}}>
          <Text >bottomline</Text>
          <Button title="pressme" onPress={this._onLoaded} />
          <ActivityIndicator size="large" color="#C108C7" />

        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#aaa',
  },
  bottomline: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
