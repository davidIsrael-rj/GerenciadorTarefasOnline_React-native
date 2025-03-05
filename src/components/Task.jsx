import React from "react";
import { Text, View } from "react-native";

export default props => {
    return(
       <View>
            <Text>{props.desc}</Text>
            <Text>{props.estimateAt + ""}</Text>
            <Text>{props.doneAt === null ? '':props.doneAt +""}</Text>
       </View> 
    )
}