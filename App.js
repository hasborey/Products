import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native';

export default class App extends Component<Props> {
  constructor () {
    super()

    this.state = {
      productImages: [],
      fetching: false
    }
  }

  componentDidMount() {
    this.setState({ fetching: true })
    fetch('http://hplussport.com/api/products.php')
      .then(response => response.json())
      .then(products => products.map(product => product.image))
      .then(productImages => this.setState({
        productImages,
        fetching: false,
      }))
      .catch(err => console.error('Error fetching products: ', err))
  }

  render() {
    return (
      <ScrollView horizontal={true}>
        {this.state.fetching &&
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            animating={this.state.fetching}
          />
        }
        {this.state.productImages.map((uri, i) => (
          <View key={i}>
            <Image style={styles.thumb} source={{ uri }} />
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 30,
  },
  thumb: {
    width: 375,
    height: 550,
    resizeMode: 'cover',
  }
});
