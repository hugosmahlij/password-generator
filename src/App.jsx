import PasswordGenerator from "./components/PasswordGenerator";
import Background from "./components/Background";
import HeaderFooterShape from "./components/HeaderFooterShape";
import Footer from "./components/Footer";
function App () {
  return (
    <div className='app-container'>
      <Background />
      <HeaderFooterShape position='top' />
      <div className='content'>
        <h2>Passeord Generator</h2>
        <PasswordGenerator />
      </div>
      <HeaderFooterShape position='bottom' />
      <Footer />
    </div>
  )
}

export default App
