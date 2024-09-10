import PasswordGenerator from "./components/PasswordGenerator";
import Background from "./components/Background";
import Footer from "./components/Footer";
import "./styles.css"

function App () {
  return (
    <div className='app-container'>
      <Background />
      <div className='content'>
        <h2>Password Generator</h2>
        <PasswordGenerator />
      </div>
      <Footer />
    </div>
  )
}

export default App
