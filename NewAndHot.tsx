// // NewAndHot.js
// import React from 'react';
// import { View, Text } from 'react-native';

// const NewAndHot = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>NewAndHot</Text>
//     </View>
//   );
// };

// export default NewAndHot;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewAndHot: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>NewAndHot</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewAndHot;

