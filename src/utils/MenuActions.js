import React from 'react';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { primary } from './Colors';

const actions = [
    {
        text: "פעולה חדשה",
        icon: <MaterialIcons name="compare-arrows" size={20} color="white" />,
        name: "bt_action",
        position: 2,
        color: primary,
        textStyle: { fontFamily: 'VarelaRound', fontSize: 17 },
        textBackground: 'transparent',
        textColor: 'white',
        textElevation: 0,
        margin: 5
    },
    {
        text: "מטרה חדשה",
        icon: <Feather name="upload" size={20} color="white" />,
        name: "bt_target",
        position: 1,
        color: primary,
        textStyle: { fontFamily: 'VarelaRound', fontSize: 17 },
        textBackground: 'transparent',
        textColor: 'white',
        textElevation: 0,
        margin: 5
    }
];

export { actions };