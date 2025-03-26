import React from "react";

import { createStackNavigator } from '@react-navigation/stack'
import Auth from "./screens/Auth";
import TaskList from "./screens/TaskList";

const Stack = createStackNavigator()

export default props => (
    <Stack.Navigator initialRouteName="Auth"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="TaskList" component={TaskList} />
    </Stack.Navigator>
)