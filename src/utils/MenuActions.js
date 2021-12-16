import React from 'react';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { primary } from './Colors';

const actions = [
    {
        text: "הפקדה/משיכה חדשה",
        icon: <MaterialIcons name="compare-arrows" size={20} color="white" />,
        name: "bt_action",
        position: 2,
        color: primary,
        textStyle: { fontFamily: 'VarelaRound', fontSize: 15 },
        textBackground: 'transparent',
        textColor: 'white',
        textElevation: 0,
        margin: 6,
        buttonSize: 35
    },
    {
        text: "מטרה חדשה",
        icon: <Feather name="upload" size={17} color="white" />,
        name: "bt_target",
        position: 1,
        color: primary,
        textStyle: { fontFamily: 'VarelaRound', fontSize: 15 },
        textBackground: 'transparent',
        textColor: 'white',
        textElevation: 0,
        margin: 6,
        buttonSize: 35
    }
];

export { actions };