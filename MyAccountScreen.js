import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import axios from 'axios';
import firebase from 'firebase/compat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyShare from './MyShare';

class MyAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sharedMovies: [],
    };
  }

  navigateToDetailspart = async (section) => {
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
      this.props.navigation.navigate('MovieDetailsSecondPart', { videoId });
    } catch (error) {
      console.error('Error navigating to details:', error);
    }
  };

  handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('Sign Out');
        this.props.navigation.navigate('SignInScreen');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  render() {
    const { modalVisible } = this.state;
    const sections = [
      { title: 'Red Notice', details: 'Mostly Watched', image: require('./assets/rednotice.jpeg') },
      { title: 'Anthracite', details: 'New episode available', image: require('./assets/anthracite.jpg') },
      { title: 'Parasite The Grey', details: 'Watch now', image: require('./assets/parasytethegrey.jpeg') },
      { title: 'The Dawn', details: 'Season 2 coming soon', image: require('./assets/thedawn.jpeg') },
      { title: 'Alchemy of Souls', details: 'Final season', image: require('./assets/alchemy.jpeg') },
      { title: 'Good Bye Earth', details: 'Series finale', image: require('./assets/goodbyeearth.jpeg') },
    ];

    return (
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.serviceName}>My Account</Text>
          <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
            <Image source={require('./assets/menubar.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Image source={require('./assets/myaccount.png')} style={styles.profileIcon} />
          <Text style={styles.initials}>My Profile</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.shared} onPress={() => this.props.navigation.navigate("Mylist")}>
            <Icon name="add" size={30} color="orange" />
            <Text style={styles.sharedtext}>  My List</Text>
            <Icon name="chevron-right" size={34} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shared} onPress={() => this.props.navigation.navigate("MyShare")}>
            <Icon name="share" size={30} color="red" />
            <Text style={styles.sharedtext}>  Shared</Text>
            <Icon name="chevron-right" size={34} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shared} onPress={() => this.props.navigation.navigate("Like")}>
            <Icon name="thumb-up" size={26} color="yellow" />
            <Text style={styles.sharedtext}>  Liked</Text>
            <Icon name="chevron-right" size={34} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize:25 , color:'white' , fontWeight:'bold'}}>{'\n'}    Award Winning Shows {'\n'}</Text>
        </View>
        {sections.map((section, index) => (
          <TouchableOpacity key={index} onPress={() => this.navigateToDetailspart(section)}>
            <View style={styles.section}>
              <Image source={section.image} style={styles.sectionImage} />
              <View style={styles.sectionDetails}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionSubtitle}>{section.details}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalVisible: false })}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => this.setState({ modalVisible: false })}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { this.setState({ modalVisible: false }); this.props.navigation.navigate('Account'); }}>
                <Text style={styles.menuText}>Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { this.setState({ modalVisible: false }); this.props.navigation.navigate('Help'); }}>
                <Text style={styles.menuText}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { this.setState({ modalVisible: false }); this.handleSignOut(); }}>
                <Text style={styles.menuText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#121212',
    backgroundColor:'#000'
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
    marginTop:10
  },
  shared: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000', 
    paddingHorizontal: 16,
    paddingVertical: 17,
    borderWidth:0,
    borderColor:'grey'
  },
  
  sharedtext: {
    color: '#fff', // White text color
    fontSize: 21,
    marginLeft: 8,
    fontWeight:"bold"
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
    marginBottom:5
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



// import React, { useState , useEffect } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import firebase from 'firebase/compat';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MyShare from './MyShare';
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
//   const [sharedMovies, setSharedMovies] = useState([]);
  
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
//     firebase.auth().signOut()
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
     
//       <View>

//       <TouchableOpacity style={styles.shared} onPress={() => navigation.navigate("Mylist")}>
//       <Icon name="add" size={30} color="orange" />
//       <Text style={styles.sharedtext}>  My List                                 </Text>
//       <Icon name="chevron-right" size={34} color="white" />
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.shared} onPress={() => navigation.navigate("MyShare")}>
//       <Icon name="share" size={30} color="red" />
//       <Text style={styles.sharedtext}>  Shared                                 </Text>
//       <Icon name="chevron-right" size={34} color="white" />
//     </TouchableOpacity>

//     <TouchableOpacity style={styles.shared} onPress={() => navigation.navigate("Like")}>
//       <Text>  </Text>
//       <Icon name="thumb-up" size={26} color="yellow" />
//       <Text style={styles.sharedtext}>  Liked                                    </Text>
//       <Icon name="chevron-right" size={34} color="white" />
//       </TouchableOpacity>

//       <Text style={{fontSize:25 , color:'white' , fontWeight:'bold'}}>{'\n'}    Award Winning Shows {'\n'}</Text>
//     </View>
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
//     // backgroundColor: '#121212',
//     backgroundColor:'#000'
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'black',
//     marginTop:10
//   },
//   shared: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#000', 
//     paddingHorizontal: 16,
//     paddingVertical: 17,
//     borderWidth:0,
//     borderColor:'grey'
//   },
  
//   sharedtext: {
//     color: '#fff', // White text color
//     fontSize: 21,
//     marginLeft: 8,
//     fontWeight:"bold"
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
//     marginBottom:5
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


// // import React, { useState } from 'react';
// // import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
// // import { useNavigation, NavigationProp } from '@react-navigation/native';
// // import axios from 'axios';

// // type Section = {
// //   title: string;
// //   details: string;
// //   image: any;
// // };

// // type MyAccountScreenNavigationProp = NavigationProp<any>;

// // const MyAccountScreen: React.FC = () => {
// //   const navigation = useNavigation<MyAccountScreenNavigationProp>();

// //   const sections: Section[] = [
// //     { title: 'Red Notice', details: 'Mostly Watched', image: require('./assets/rednotice.jpeg') },
// //     { title: 'Anthracite', details: 'New episode available', image: require('./assets/anthracite.jpg') },
// //     { title: 'Parasite The Grey', details: 'Watch now', image: require('./assets/parasytethegrey.jpeg') },
// //     { title: 'The Dawn', details: 'Season 2 coming soon', image: require('./assets/thedawn.jpeg') },
// //     { title: 'Alchemy of Souls', details: 'Final season', image: require('./assets/alchemy.jpeg') },
// //     { title: 'Good Bye Earth', details: 'Series finale', image: require('./assets/goodbyeearth.jpeg') },
// //   ];

// //   const [modalVisible, setModalVisible] = useState(false);

// //   const navigateToDetailspart = async (section: Section) => {
// //     try {
// //       const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
// //         params: {
// //           key: 'AIzaSyAjwfp7NtheyVWVl7DMj2NCYzZ5J9mpahs',
// //           part: 'snippet',
// //           type: 'video',
// //           q: `${section.title} trailer`,
// //           maxResults: 1,
// //         },
// //       });

// //       const videoId = response.data.items[0].id.videoId;

// //       navigation.navigate('MovieDetailsSecondPart', { videoId });
// //     } catch (error) {
// //       console.error('Error navigating to details:', error);
// //     }
// //   };

// //   const handleSignOut = () => {
// //     // Replace this with your sign-out logic
// //     console.log('Sign Out');
// //     // Example: navigation.navigate('SignInScreen');
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <View style={styles.topBar}>
// //         <Text style={styles.serviceName}>My Account</Text>
// //         <TouchableOpacity onPress={() => setModalVisible(true)}>
// //           <Image source={require('./assets/menubar.png')} style={styles.icon} />
// //         </TouchableOpacity>
// //       </View>
// //       <View style={styles.profileSection}>
// //         <Image source={require('./assets/myaccount.png')} style={styles.profileIcon} />
// //         <Text style={styles.initials}>My Profile</Text>
// //       </View>
// //       {sections.map((section, index) => (
// //         <TouchableOpacity key={index} onPress={() => navigateToDetailspart(section)}>
// //           <View style={styles.section}>
// //             <Image source={section.image} style={styles.sectionImage} />
// //             <View style={styles.sectionDetails}>
// //               <Text style={styles.sectionTitle}>{section.title}</Text>
// //               <Text style={styles.sectionSubtitle}>{section.details}</Text>
// //             </View>
// //           </View>
// //         </TouchableOpacity>
// //       ))}
      
// //       {/* Modal for displaying menu */}
// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisible}
// //         onRequestClose={() => setModalVisible(false)}
// //       >
// //         <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
// //           <View style={styles.modalContent}>
// //             <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
// //               <Text style={styles.closeButtonText}>X</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('Account'); }}>
// //               <Text style={styles.menuText}>Account</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('Help'); }}>
// //               <Text style={styles.menuText}>Help</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); handleSignOut(); }}>
// //               <Text style={styles.menuText}>Sign Out</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </TouchableOpacity>
// //       </Modal>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#121212',
// //   },
// //   topBar: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     padding: 10,
// //     backgroundColor: 'black',
// //   },
// //   serviceName: {
// //     color: 'white',
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   icon: {
// //     width: 30,
// //     height: 30,
// //     resizeMode: 'contain',
// //   },
// //   profileSection: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 10,
// //   },
// //   profileIcon: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 5,
// //     backgroundColor: 'grey',
// //   },
// //   initials: {
// //     color: 'white',
// //     paddingTop: 10,
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   section: {
// //     flexDirection: 'row',
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: 'grey',
// //   },
// //   sectionImage: {
// //     width: 160,
// //     height: 120,
// //     resizeMode: 'contain',
// //   },
// //   sectionDetails: {
// //     marginLeft: 10,
// //     justifyContent: 'center',
// //   },
// //   sectionTitle: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// //   sectionSubtitle: {
// //     color: 'grey',
// //     fontSize: 14,
// //   },
// //   modalContainer: {
// //     flex: 1,
// //     justifyContent: 'flex-end',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //   },
// //   modalContent: {
// //     backgroundColor: 'black',
// //     padding: 20,
// //     borderTopLeftRadius: 10,
// //     borderTopRightRadius: 10,
// //   },
// //   closeButton: {
// //     alignSelf: 'flex-end',
// //     padding: 10,
// //   },
// //   closeButtonText: {
// //     color: 'white',
// //     fontSize: 18,
// //   },
// //   menuItem: {
// //     paddingVertical: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: 'grey',
// //   },
// //   menuText: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// // });

// // export default MyAccountScreen;
