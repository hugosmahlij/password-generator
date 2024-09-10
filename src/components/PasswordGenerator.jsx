import { useState } from "react";
import Swal from "sweetalert2";

const PasswordGenerator = () => {
    const [lenght, setLenght] = useState(10);
    const [hasUpper, setHasUpper] = useState(true);
    const [hasLower, setHasLower] = useState(true);
    const [hasNumber, setHasNumber] = useState(true);
    const [hasSymbol, setHasSymbol] = useState(true);
    const [password, setPassword] = useState("");


    const randomFunc = {
        lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
        upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
        number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
        symbol: () => {
            const symbols = "!@#$%^&*()[]{}=<>/,.";
            return symbols[Math.floor(Math.random() * symbols.length)];
        }
    }

    const generatePassword = () => {
        const typesArr = [
            { lower: hasLower },
            { upper: hasUpper },
            { number: hasNumber },
            { symbol: hasSymbol },
        ].filter((item) => Object.values(item)[0]);


        if (typesArr.lenght === 0) return "";

        let generatedPassword = "";
        for (let i = 0; i < length; i += typesArr.length) {
            typesArr.forEach((type) => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }

        setPassword(generatedPassword.slice(0, length));
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        Swal.fire({
            icon: "info",
            title: "Copied to clipboard",
            time: 2000,
            showConfirmButton: false,
        })
    }
    return (
        <div className="password-generator">
            <div className="result-container">
                <span id="result">{password}</span>
                <button className="btn" onClick={copyToClipboard}></button>
            </div>
            <div className="settings">
                <label>
                    Password lenght
                    <input
                        type="number"
                        value={lenght}
                        onChange={(e) => setLenght(e.target.value)}
                        min="4"
                        max="20" />
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={hasUpper}
                        onChange={(e) => setHasUpper(e.target.checked)}
                    />
                    Include uppercase letters
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={hasLower}
                        onChange={(e) => setHasLower(e.target.checked)}
                    />
                    Include lowercase letters
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={hasNumber}
                        onChange={(e) => setHasNumber(e.target.checked)}
                    />
                    Include numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={hasSymbol}
                        onChange={(e) => setHasSymbol(e.target.checked)}
                    />
                    Include symbols
                </label>
            </div>
            <button className="btn" onClick={generatePassword}>
                Generate password
            </button>
        </div>
    )
}

export default PasswordGenerator;