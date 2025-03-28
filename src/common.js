import { Alert, Platform } from "react-native";

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000' : 'http://192.168.1.19:3000'

    // para android pode ser esse caminho http://10.0.2.2:3000

    function showError(err){
    Alert.alert('Ops! Ocorreu um Probema!', `Mensagem: ${err}`)
}

function showSuccess(msg){
    Alert.alert('Sucesso!', msg)
}

export {server, showError, showSuccess}