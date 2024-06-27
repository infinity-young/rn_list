import { Text, View } from 'react-native';
import React from 'react';
import App from '../../listpage/src/App'
interface Props{
    index?: number;
}
export default class MyApp extends React.PureComponent<Props>{
   render() {
       return (
           <View>
                <App/>
           </View>)
   }
}
