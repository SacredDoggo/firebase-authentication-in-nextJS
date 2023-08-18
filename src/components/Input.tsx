import React from "react";

interface InputProps {
    label?: string;
    id: string;
    onChange: any;
    value?: string;
    placeHolder?: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    onChange,
    value,
    placeHolder,
    type
}) => {
    return (
        <div className="relative">
            <p className="text-sm">{label}</p>
            <input
                id={id}
                onChange={onChange}
                value={value}
                type={type}
                className="
                    block rounded-md
                    px-2
                    pt-2
                    pb-2
                    mt-1
                    mb-2
                    w-full
                    text-md border-2

                "
                placeholder={placeHolder}
            />
        </div>
    );
}

export default Input;