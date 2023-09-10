import React from 'react';

import InputSelect, { InputSelectProps } from "./inputSelect/InputSelect";

export type InputProps = {
    type: 'select';
} & InputSelectProps;

const Input = (props: InputProps): React.ReactElement => {
    switch (props.type) {
        case "select":
            return <InputSelect {...props} />;
    }
};

export default Input;