import React from "react"

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens'
// import './gesture-handler';
import { StyleSheet, Text, View } from "react-native"


enableScreens();

export default props => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.texto}>Gerenciador de Tarefas</Text>
                <Text style={styles.texto}>Projeto Task</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
    },
    texto:{
        fontSize:24,
        fontWeight:"bold",        
    }
})