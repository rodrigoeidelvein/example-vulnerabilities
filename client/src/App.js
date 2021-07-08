import { Router } from "@reach/router";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Registrar from "./Registrar";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <ProtectedRoute path="/" component={Home} />
      <ProtectedAdminRoute path="/dashboard" component={Dashboard} />
      <Login path="/login" />
      <Registrar path="/registrar" />
    </Router>
  );
}

export default App;
