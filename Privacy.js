import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const Privacy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information about you when you use our services, including our mobile application and website.
        </Text>
        <Text style={styles.paragraph}>
          We collect information you provide directly to us, such as when you create or modify your account, contact customer support, or otherwise communicate with us. This information may include your name, email address, and any other information you choose to provide.
        </Text>
        <Text style={styles.paragraph}>
          We use the information we collect to provide, maintain, and improve our services, including to authenticate users, personalize content, and analyze usage patterns. We may also use your information to communicate with you, such as sending you service-related announcements or updates.
        </Text>
        <Text style={styles.paragraph}>
          We may share your information with third parties for various purposes, including to provide services on our behalf, conduct analytics, and comply with legal obligations. We require these third parties to maintain the confidentiality of your information and use it only for the purposes for which we disclose it to them.
        </Text>
        <Text style={styles.paragraph}>
          We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee its absolute security.
        </Text>
        <Text style={styles.paragraph}>
          By using our services, you consent to the processing of your information as set forth in this Privacy Policy. If you have any questions or concerns about our privacy practices, please contact us.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: 'yellow',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    lineHeight: 22,
  },
});

export default Privacy;
