import React, { useEffect, useState } from 'react';

export type OptionItemProps = {
    label: string;
    value: string;
}

export type InputSelectProps = {
    className?: string;
    options: OptionItemProps[];
    value?: string;
    events?: {
        onChange?: (e: any) => void;
    }
};

const InputSelect = ({ className, options, value, events }: InputSelectProps): React.ReactElement => {
    const [ v, setV ] = useState(value);

    useEffect(() => {
        setV(value);
    }, [ value ]);

    return (
        <div className={`input-select${className ? ` ${className}` : ''}`}>
            <select
                className="form-select"
                aria-label="Default select example"
                value={v}
                onChange={events?.onChange}>
                {options.map((option: OptionItemProps, i: number) => <option
                    key={i}
                    value={option.value}>{option.label}</option>)}
            </select>
        </div>
    );
};

export default InputSelect;