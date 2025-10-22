import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const Button: React.FC<ButtonProps> = ( { children, onClick, className = '' } ) => {
    return (
        <button
            onClick={ onClick }
            className={ `px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition ${ className }` }
        >
            { children }
        </button>
    );
};

export default Button;
