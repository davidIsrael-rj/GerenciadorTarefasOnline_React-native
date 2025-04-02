import React from "react";

import { createStackNavigator } from '@react-navigation/stack'
import Auth from "./screens/Auth";
import TaskList from "./screens/TaskList";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerComponentes = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Drawer.Screen name="Hoje" >
                {props => <TaskList title='Hoje' daysAhead={0} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="Amanhã" >
                {props => <TaskList title='Amanhã' daysAhead={1} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="Semana" >
                {props => <TaskList title='Semana' daysAhead={7} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="Mês" >
                {props => <TaskList title='Mês' daysAhead={30} {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default props => (
    <Stack.Navigator initialRouteName="Auth"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth">
            {props => <Auth {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TaskList" component={DrawerComponentes} />
    </Stack.Navigator>
)