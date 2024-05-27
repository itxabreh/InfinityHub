// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const MyAccountScreen = () => {
//   const navigation = useNavigation();

//   const sections = [
//     { title: 'Red Notice', details: 'Mostly Watched', image: require('./assets/rednotice.jpeg') },
//     { title: 'Anthracite', details: 'New episode available', image: require('./assets/anthracite.jpg') },
//     { title: 'Parasite The Grey', details: 'Watch now', image: require('./assets/parasytethegrey.jpeg') },
//     { title: 'The Dawn', details: 'Season 2 coming soon', image: require('./assets/thedawn.jpeg') },
//     { title: 'Alchemy of Souls', details: 'Final season', image: require('./assets/alchemy.jpeg') },
//     { title: 'Good Bye Earth', details: 'Series finale', image: require('./assets/goodbyeearth.jpeg') },
//   ];

//   const [modalVisible, setModalVisible] = useState(false);

//   const navigateToDetailspart = async (section) => {
//     try {
//       const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//         params: {
//           key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
//           part: 'snippet',
//           type: 'video',
//           q: `${section.title} trailer`,
//           maxResults: 1,
//         },
//       });

//       const videoId = response.data.items[0].id.videoId;

//       navigation.navigate('MovieDetailsSecondPart', { videoId });
//     } catch (error) {
//       console.error('Error navigating to details:', error);
//     }
//   };

//   const handleSignOut = () => {
//     // Replace this with your sign-out logic
//     console.log('Sign Out');
//     // Example: navigation.navigate('SignInScreen');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.topBar}>
//         <Text style={styles.serviceName}>My Account</Text>
//         <TouchableOpacity onPress={() => setModalVisible(true)}>
//           <Image source={require('./assets/menubar.png')} style={styles.icon} />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.profileSection}>
//         <Image source={require('./assets/myaccount.png')} style={styles.profileIcon} />
//         <Text style={styles.initials}>My Profile</Text>
//       </View>
//       {sections.map((section, index) => (
//         <TouchableOpacity key={index} onPress={() => navigateToDetailspart(section)}>
//           <View style={styles.section}>
//             <Image source={section.image} style={styles.sectionImage} />
//             <View style={styles.sectionDetails}>
//               <Text style={styles.sectionTitle}>{section.title}</Text>
//               <Text style={styles.sectionSubtitle}>{section.details}</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       ))}
      
//       {/* Modal for displaying menu */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//               <Text style={styles.closeButtonText}>X</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('Account'); }}>
//               <Text style={styles.menuText}>Account</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('Help'); }}>
//               <Text style={styles.menuText}>Help</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); handleSignOut(); }}>
//               <Text style={styles.menuText}>Sign Out</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'black',
//   },
//   serviceName: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },
//   profileSection: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   profileIcon: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//     backgroundColor: 'grey',
//   },
//   initials: {
//     color: 'white',
//     paddingTop: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   section: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'grey',
//   },
//   sectionImage: {
//     width: 160,
//     height: 120,
//     resizeMode: 'contain',
//   },
//   sectionDetails: {
//     marginLeft: 10,
//     justifyContent: 'center',
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 16,
//   },
//   sectionSubtitle: {
//     color: 'grey',
//     fontSize: 14,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'black',
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     padding: 10,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   menuItem: {
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: 'grey',
//   },
//   menuText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default MyAccountScreen;


import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';

type Section = {
  title: string;
  details: string;
  image: any;
};

type MyAccountScreenNavigationProp = NavigationProp<any>;

const MyAccountScreen: React.FC = () => {
  const navigation = useNavigation<MyAccountScreenNavigationProp>();

  const sections: Section[] = [
    { title: 'Red Notice', details: 'Mostly Watched', image: require('./assets/rednotice.jpeg') },
    { title: 'Anthracite', details: 'New episode available', image: require('./assets/anthracite.jpg') },
    { title: 'Parasite The Grey', details: 'Watch now', image: require('./assets/parasytethegrey.jpeg') },
    { title: 'The Dawn', details: 'Season 2 coming soon', image: require('./assets/thedawn.jpeg') },
    { title: 'Alchemy of Souls', details: 'Final season', image: require('./assets/alchemy.jpeg') },
    { title: 'Good Bye Earth', details: 'Series finale', image: require('./assets/goodbyeearth.jpeg') },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const navigateToDetailspart = async (section: Section) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
          part: 'snippet',
          type: 'video',
          q: `${section.title} trailer`,
          maxResults: 1,
        },
      });

      const videoId = response.data.items[0].id.videoId;

      navigation.navigate('MovieDetailsSecondPart', { videoId });
    } catch (error) {
      console.error('Error navigating to details:', error);
    }
  };

  const handleSignOut = () => {
    // Replace this with your sign-out logic
    console.log('Sign Out');
    // Example: navigation.navigate('SignInScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.serviceName}>My Account</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require('./assets/menubar.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <Image source={require('./assets/myaccount.png')} style={styles.profileIcon} />
        <Text style={styles.initials}>My Profile</Text>
      </View>
      {sections.map((section, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToDetailspart(section)}>
          <View style={styles.section}>
            <Image source={section.image} style={styles.sectionImage} />
            <View style={styles.sectionDetails}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.details}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
      {/* Modal for displaying menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('Account'); }}>
              <Text style={styles.menuText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('Help'); }}>
              <Text style={styles.menuText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); handleSignOut(); }}>
              <Text style={styles.menuText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  serviceName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  profileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: 'grey',
  },
  initials: {
    color: 'white',
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  sectionImage: {
    width: 160,
    height: 120,
    resizeMode: 'contain',
  },
  sectionDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
  },
  sectionSubtitle: {
    color: 'grey',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MyAccountScreen;
