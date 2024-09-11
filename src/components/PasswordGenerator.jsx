import { useState } from "react";
import copyIcon from "../assets/no-file.png"
import Swal from "sweetalert2";

const PasswordGenerator = () => {
    const [length, setLength] = useState(10);
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
        const parsedLength = parseInt(length, 10);

        for (let i = 0; i < parsedLength; i += typesArr.length) {
            typesArr.forEach((type) => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }

        setPassword(generatedPassword.slice(0, length));
        console.log(generatedPassword);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);

        const isMobile = window.innerWidth <= 768;

        Swal.fire({
            icon: "info",
            title: "Copied to clipboard",
            toast: true,
            position: isMobile ? "center" : "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        })
    }
    return (
        <div className="password-generator">
            <div className="result-container">
                <span id="result">{password}</span>
                <button className="btn" onClick={copyToClipboard}><img src={copyIcon} alt="Copy to clipboard" className="copy-icon" /></button>
            </div>
            <div className="settings">
                <label>
                    Password length
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
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