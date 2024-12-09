import './App.scss';
import Index from "./Routes";
import { AppProvider } from './Services/Context'

function App() {
  return (
    <AppProvider>
      <Index />
    </AppProvider>
  );
}

export default App;
