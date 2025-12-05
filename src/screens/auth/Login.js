
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function Registration() {
  const navigation = useNavigation();

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({  email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    const nextErrors = {  email: '', password: '' };

   

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nextErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!password) {
      nextErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(nextErrors);
    return valid;
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
  <Text style={styles.title}>Login</Text>
        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Please enter your email"
            style={[styles.input, errors.email ? styles.inputError : null]}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />
          {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Please enter your password"
            style={[styles.input, errors.password ? styles.inputError : null]}
            secureTextEntry
            returnKeyType="done"
          />
          {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
          onPress={() => navigation.navigate('Home')}
        >
         
            <Text style={styles.primaryBtnText}>Login</Text>
          
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#222',
  },
  inputError: {
    borderColor: '#e53935',
  },
  error: {
    marginTop: 6,
    color: '#e53935',
    fontSize: 12,
  },
  primaryBtn: {
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
});
