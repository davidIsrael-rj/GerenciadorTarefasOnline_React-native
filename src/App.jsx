import React from "react"
import { StyleSheet, Text, View } from "react-native"

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