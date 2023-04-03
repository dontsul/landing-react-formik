import { Header } from './Components/header/Header';
import { Main } from './Components/main/Main';
import { RegistrationForm } from './Components/registrationForm/RegistrationForm';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className="App">
            <ToastContainer />
            <Header />
            <Main />
            <RegistrationForm />
        </div>
    );
}

export default App;
