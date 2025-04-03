import React, { Component } from "react";
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"
import commonStyles from "../commonStyles";
import hojeImage from '../../assets/imgs/today.jpg'
import amanhaImage from '../../assets/imgs/tomorrow.jpg'
import semanaImage from '../../assets/imgs/week.jpg'
import mesImage from '../../assets/imgs/month.jpg'

import axios from "axios";
import { server, showError } from "../common";

import moment from 'moment'
import 'moment/locale/pt-br'
import Task from "../components/Task";
import Icon from "react-native-vector-icons/FontAwesome";
import AddTask from "./addTask";

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

export default class TaskList extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('taskState')
        const saveState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: saveState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = await moment()
                .add({ days: this.props.daysAhead})
                .format(`YYYY-MM-DD 23:59:59`)
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            // const res = await axios.get(`${server}/tasks`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (e) {
            showError(e)
        }

    }
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('taskState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            await this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    addTask = async newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })
            this.setState({ showAddTask: false }, this.loadTasks)
        } catch (e) {
            showError(e)
        }


    }

    tela = tela => {
        if (tela === 'hoje') {
            return hojeImage
        } else if (tela === 'Amanhã') {
            return amanhaImage
        } else if (tela === 'Semana') {
            return semanaImage
        } else if (tela === 'Mês') {
            return mesImage
        } else {
            return hojeImage
        }
    }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            await this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask}
                />
                <ImageBackground source={this.tela(this.props.title)} style={styles.backgroud}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitulo}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
                </View>
                <TouchableOpacity style={styles.addButton}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddTask: true })}>
                    <Icon name="plus" size={20}
                        color={commonStyles.colors.secondary} />
                </TouchableOpacity>
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
        padding: 10
    },
    titleBar: {
        flex: 1,
        alignContent: "flex-end",
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitulo: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "flex-end",
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: "center",
        alignItems: "center"
    }
})