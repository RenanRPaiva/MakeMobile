import {useFormik} from 'formik';
import React from 'react';
import {Container} from '../../components/Container';
import {CustomButton} from '../../components/CustomButton';
import {FormField} from '../../components/FormField';
import * as yup from 'yup';
import {loginUser} from '../../services/loginUser';
import Toast from 'react-native-toast-message';
import {isNativeFirebaseAuthError} from '../../utils/isNativeFirebaseAuthError';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../store/slices/userSlice';

type FormValues = {
  email: string;
  password: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginView({navigation}: Props) {
  const dispatch = useDispatch();
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required('Informe o e-mail.')
        .email('Informe um e-mail válido.'),
      password: yup.string().required('Informe a senha.'),
    }),
    onSubmit: async values => {
      try {
        const user = await loginUser(values);
        dispatch(updateUser(user));
        navigation.navigate('Orders');
      } catch (error) {
        const errorMsg =
          isNativeFirebaseAuthError(error) &&
          (error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password')
            ? 'Login ou senha inválidos.'
            : 'Falha ao fazer login. Tente novamente.';
        Toast.show({
          type: 'error',
          text1: errorMsg,
        });
      }
    },
  });
  const getFieldProps = (fieldName: keyof FormValues) => ({
    value: formik.values[fieldName],
    onChangeText: formik.handleChange(fieldName),
    onBlur: formik.handleBlur(fieldName),
    error: formik.errors[fieldName],
    isInvalid: formik.touched[fieldName] && !!formik.errors[fieldName],
    isValid: formik.touched[fieldName] && !formik.errors[fieldName],
  });
  return (
    <Container padding>
      <FormField
        {...getFieldProps('email')}
        label="E-mail"
        placeholder="Informe seu e-mail de acesso"
        keyboardType="email-address"
      />
      <FormField
        {...getFieldProps('password')}
        label="Senha"
        placeholder="Informe sua senha de acesso"
        secureTextEntry
      />
      <CustomButton
        onPress={formik.handleSubmit}
        disabled={formik.isValidating || formik.isSubmitting}
        loading={formik.isValidating || formik.isSubmitting}>
        Entrar
      </CustomButton>
    </Container>
  );
}
