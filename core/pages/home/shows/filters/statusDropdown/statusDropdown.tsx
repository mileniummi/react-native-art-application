import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {EShowStatus} from '../../../../../models/show.model';
import {ShowStatuses} from './statusDropdown.constant';

export interface IShowStatusDropdownProps {
    value: EShowStatus;
    onChange: (v: EShowStatus) => void;
}

export const ShowStatusDropdown = ({value, onChange}: IShowStatusDropdownProps) => (
    <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        itemTextStyle={styles.itemTextStyle}
        maxHeight={200}
        value={value}
        data={ShowStatuses}
        valueField="value"
        labelField="label"
        placeholder="Select show status"
        onChange={e => {
            onChange(e.value);
        }}
    />
);

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        padding: 8,
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: '#EEEEEE',
        borderWidth: 1,
        shadowColor: '#0000000D',
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        shadowOffset: {
            width: 3,
            height: 2,
        },
        elevation: 10,
        maxWidth: 150,
        backgroundColor: '#fff',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
        lineHeight: 15,
        fontFamily: 'Archivo_400Regular',
        color: '#000000',
    },

    itemTextStyle: {
        fontSize: 14,
        lineHeight: 15,
        fontFamily: 'Archivo_400Regular',
        color: 'rebeccapurple',
    },
});
