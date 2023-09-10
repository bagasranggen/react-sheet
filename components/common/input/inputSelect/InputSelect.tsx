import React from 'react';

export type OptionItemProps = {
    label: string;
    value: string;
}

export type InputSelectProps = {
    options: OptionItemProps[];
    value?: string;
    events?: {
        onChange?: (e: any) => void;
    }
};

const InputSelect = ({ options, value, events }: InputSelectProps): React.ReactElement => (
    <select
        className="form-select"
        aria-label="Default select example"
        {...value && { defaultValue: value }}
        onChange={events?.onChange}>
        {options.map((option: OptionItemProps, i: number) => <option
            key={i}
            value={option.value}>{option.label}</option>)}
    </select>
);

export default InputSelect;