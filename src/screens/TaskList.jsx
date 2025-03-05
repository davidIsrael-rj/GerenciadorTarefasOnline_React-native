import React, { Component } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import commonStyles from "../commonStyles";
import todayImage from '../../assets/imgs/today.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.backgroud}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitulo}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <Text>Tarefa #01</Text>
                    <Text>Tarefa #02</Text>
                    <Text>Tarefa #03</Text>
                    <Text>Tarefa #04</Text>
                    <Text>Tarefa #05</Text>
                    <Text>Tarefa #06</Text>
                    <Text>Tarefa #07</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroud: {
        flex: 3
    },
    taskList: {
        flex: 7,
        padding:10
    },
    titleBar: {
        flex: 1,
        alignContent: "flex-end",
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize:50,
        color: commonStyles.colors.secondary,
        marginLeft:20,
        marginBottom:20,
    },
    subtitulo:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize:20,
        marginLeft:20,
        marginBottom:30
    }
})