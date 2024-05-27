// //Help
// // NewAndHot.js
// import React from 'react';
// import { View, Text } from 'react-native';

// const Help = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Help</Text>
//     </View>
//   );
// };

// export default Help;



import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Help extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Help</Text>
      </View>
    );
  }
}

export default Help;

