import * as React from "react"
import { View,TouchableOpacity } from "react-native"
import Svg, { LinearGradient, Path, Stop } from "react-native-svg"
import { SvgXml } from 'react-native-svg';
const SvgComponent = ({ accessibilityState, children, onPress}) => {

var isSelected = accessibilityState.selected

// if (isSelected) {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: 'row', position: 'absolute', top: -30,left:-10 }}>
                <View style={{ flex: 1, backgroundColor: 'yellow' }}></View>
     <SvgXml
        xml={`<svg height="100px" width="100px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon style="fill:#C3F6F9;" points="256,499.47 512,146.167 414.217,12.53 97.784,12.53 0.001,146.167 "></polygon> <g> <polygon style="fill:#D1F9F7;" points="97.786,12.53 170.663,146.172 0,146.172 "></polygon> <polygon style="fill:#D1F9F7;" points="414.217,12.53 341.327,146.172 255.995,12.53 "></polygon> <polygon style="fill:#D1F9F7;" points="341.327,146.172 255.995,499.467 170.663,146.172 "></polygon> </g> <g> <polygon style="fill:#9EE7E7;" points="414.217,12.53 511.99,146.172 341.327,146.172 "></polygon> <polygon style="fill:#9EE7E7;" points="255.995,12.53 341.327,146.172 170.663,146.172 "></polygon> <polygon style="fill:#9EE7E7;" points="170.663,146.172 255.995,499.467 0,146.172 "></polygon> </g> </g></svg>`}
      />

                <View style={{ flex: 1, backgroundColor: 'blue' }}></View>
            </View>

            <TouchableOpacity
                style={{
                   
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: 'transparent'
                }}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        </View>
    )

    // <svg height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon style="fill:#C3F6F9;" points="256,499.47 512,146.167 414.217,12.53 97.784,12.53 0.001,146.167 "></polygon> <g> <polygon style="fill:#D1F9F7;" points="97.786,12.53 170.663,146.172 0,146.172 "></polygon> <polygon style="fill:#D1F9F7;" points="414.217,12.53 341.327,146.172 255.995,12.53 "></polygon> <polygon style="fill:#D1F9F7;" points="341.327,146.172 255.995,499.467 170.663,146.172 "></polygon> </g> <g> <polygon style="fill:#9EE7E7;" points="414.217,12.53 511.99,146.172 341.327,146.172 "></polygon> <polygon style="fill:#9EE7E7;" points="255.995,12.53 341.327,146.172 170.663,146.172 "></polygon> <polygon style="fill:#9EE7E7;" points="170.663,146.172 255.995,499.467 0,146.172 "></polygon> </g> </g></svg>
// } else {
//     return (
//         <TouchableOpacity
//             style={{
//                 flex: 1,
//                 height: 60,
//                 backgroundColor: 'red'
//             }}
//             activeOpacity={1}
//             onPress={onPress}
//         >
//             {children}
//         </TouchableOpacity>
//     )
// }
    

}
    
//     <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={80}
//     height={60}
//     viewBox="0 0 110 60"
//     fill="none"
//   >
//     <Path
//       fill={focused ? 'red' : 'gray'}
//       d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
//     />
//   </Svg>

export default SvgComponent