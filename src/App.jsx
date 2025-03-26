import React from "react"

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens'
// import './gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import TaskList from "./screens/TaskList";
import Auth from "./screens/Auth";
import Navigator from "./Navigator";
import { NavigationContainer } from '@react-navigation/native'


enableScreens();

export default props => {
    return (
        <SafeAreaView style={styles.container}>
            {/* <Auth/> */}
            <NavigationContainer>
                {/* <TaskList /> */}
                <Navigator />
            </NavigationContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: '#fff',
    },
    texto: {
        fontSize: 24,
        fontWeight: "bold",
    }
})