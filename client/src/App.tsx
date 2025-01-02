import { Switch, Route } from "wouter";
import { Home } from "@/pages/Home";
import { Landing } from "@/pages/Landing";

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Home} />
    </Switch>
  );
}

export default App;