import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

const Help = () => {

  const faqs = [
    {
      question: "How do I sign up?",
      answer: "To sign up, click on the 'Sign Up' button on the login screen and fill in your details."
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Your Password?' link on the login screen and follow the instructions."
    },
    {
      question: "How do I search for movies?",
      answer: "To search for movies, go to the 'Search' tab and enter the movie name in the search bar."
    },
    {
      question: "How do I add movies to my list?",
      answer: "To add movies to your list, click on the 'Add to My List' button on the movie details screen."
    }
  ];

  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "You can reach us at support@infinityhub.com or call us at (123) 456-7890.",
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>FAQs</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Contact Support</Text>
        <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'yellow',
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 15,
  },
  question: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: 'yellow',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Help;



// // //Help
// // // NewAndHot.js
// // import React from 'react';
// // import { View, Text } from 'react-native';

// // const Help = () => {
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text>Help</Text>
// //     </View>
// //   );
// // };

// // export default Help;



// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

// class Help extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Help</Text>
//       </View>
//     );
//   }
// }

// export default Help;

