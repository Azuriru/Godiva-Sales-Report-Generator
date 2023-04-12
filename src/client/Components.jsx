import { useState } from 'react';

export function Button({ text, onClick }) {
    return (
        <div className="button" onClick={onClick}>
            {text}
        </div>
    );
}

export function Collapsible({ children, hidden, title }) {
    const [shown, setShown] = useState(hidden);

    return (
        <div className={`collapsible ${shown ? 'hidden' : ''}`}>
            <div className="title">{title}</div>
            <Button text="Generate" onClick={() => setShown(!shown)} />
            <div className="body">{children}</div>
        </div>
    );
}

export function Group({ className, title, children }) {
    return (
        <div className={`group ${className || ''}`}>
            {title && <div className="title">{title}</div>}
            <div className="inputs">{children}</div>
        </div>
    );
}

export function Radio({ children }) {
    return <div className="radio">{children}</div>;
}

export function Input({ type, label, value, arrows, onInput }) {
    return (
        <div className="input">
            <div className="wrapper">
                <div className="label">{label}</div>
                <input
                    type={type}
                    value={value}
                    onInput={(e) => onInput(e.target.value)}
                />
            </div>
            {arrows && (
                <div className="arrows">
                    <div
                        className="up"
                        onClick={() => onInput((val) => val + 1)}
                    ></div>
                    <div
                        className="down"
                        onClick={() => onInput((val) => val - 1)}
                    ></div>
                </div>
            )}
        </div>
    );
}

export function CopyButton({ data }) {
    return (
        <Button text="Copy" onClick={() => navigator.clipboard.write(data)} />
    );
}
