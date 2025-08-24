import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { DataProvider } from "./context/DataContext";

createRoot(document.getElementById('root')).render(
    <DataProvider>
        <App />
    </DataProvider>
)
