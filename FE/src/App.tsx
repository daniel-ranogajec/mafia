import { Routes } from "./Routes";
import { BrowserRouter as Router} from 'react-router-dom'
import AuthProvider from "./provider/AuthProvider";

function App() {
  return (
    <div className="App">
      <Router>
          <AuthProvider>
        <Routes />
          </AuthProvider>
      </Router>



    </div>
  );
}

export default App;
