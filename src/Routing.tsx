import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import SignUp from './page/Signup';
import AuthenticatedPage from './page/Authenticatedpage';

const App = () => {
  return (
    <Router>
      {/* routes go here */}
      <Routes>
        <Route path='/' element={<SignUp />} />
      </Routes>
      <Routes>
        <Route path='/authenticated' element={<AuthenticatedPage />} />
      </Routes>
      <Routes>
        <Route path="/login"  element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/signup"  element={<SignUp/>} />
      </Routes>
    </Router>
  );
};



export default App;