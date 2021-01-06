import { h } from 'preact';
import {useState} from "preact/hooks";

/**
 * Example
 * @deprecated
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function Counter(props) {
    const [count, setCount] = useState(1);
    return (
        <p>
            <button onClick={() => setCount((count) => count + 1)}>Click Me</button>
            {' '}
            Clicked {count} times.
        </p>
    );
}

export default Counter;
