import React, { Component } from 'react'
import {
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

export default class Auth extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: true
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <TextInput
                            placeholder='Nome'
                            placeholderTextColor='rgba(0,0,0,0.5)'
                            value={this.state.name}
                            style={styles.input}
                            onChange={name => this.setState({ name })}
                        />
                    }
                    <TextInput
                        placeholder='E-Mail'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        placeholder='Senha'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        value={this.state.password}
                        style={styles.input}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry={true}
                    />
                    {this.state.stageNew &&
                        <TextInput
                            placeholder='Confirmação de Senha'
                            placeholderTextColor='rgba(0,0,0,0.5)'
                            value={this.state.confirmPassword}
                            style={styles.input}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        />
                    }
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                                </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        backgroundColor: '#fff',
        marginTop: 10,
        color: '#000',
        padding: Platform.OS == 'ios' ? 15 : 10
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'

    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})