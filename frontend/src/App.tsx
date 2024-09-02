import NavBar from './components/NavBar'
import Settings from './components/Settings'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider, ThemeProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <ThemeProvider>
      <section>
        <Router>
          <EntryProvider>
            <div className="flex flex-row-reverse">
              <div>
              <Settings />
              </div>
            </div>
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<AllEntries/>}>
              </Route>
              <Route path="create" element={<NewEntry/>}>
              </Route>
              <Route path="edit/:id" element={<EditEntry/>}>
              </Route>
            </Routes>
          </EntryProvider>
        </Router>
      </section>
    </ThemeProvider>
  );
}
