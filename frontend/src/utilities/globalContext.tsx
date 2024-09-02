import {createContext , useState, FC, ReactNode, useEffect} from 'react'
import {Entry, EntryContextType, Theme, ThemeContextType} from '../@types/context'
import axios from 'axios'

export const EntryContext = createContext<EntryContextType | null>(null);

export const EntryProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [entries, setEntries] = useState<Entry[]>([]);

    const initState = async () => {
        const data = await axios.get<Entry[]>('http://localhost:3001/get/')
        const initialStateBody = data.data
        setEntries(initialStateBody)
    }

    useEffect(() => {
        initState()
      }, []);

    const saveEntry = async (entry: Entry) => {
        const requestData = await axios.post<Entry>('http://localhost:3001/create/', entry)
        const newEntry = requestData.data
        setEntries([...entries, newEntry])
      }

    const updateEntry = async (id: string, entry: Entry) => {
        await axios.put<Entry>(`http://localhost:3001/update/${id}`, entry)
        setEntries(entries => {
          const entryIndex = entries.findIndex((obj => obj.id == id))
          entries[entryIndex] = entry
          console.log(entries)
          return entries
        })
    }
    const deleteEntry = async (id: string) => {
        await axios.delete<Entry>(`http://localhost:3001/delete/${id}`)
        setEntries(e => e.filter(entry => entry.id != id))
    }
    return (
        <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry }}>
          {children}
        </EntryContext.Provider>
      )
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

function getInitialTheme(key: string) : Theme {
    const storedTheme = localStorage.getItem(key)
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme
    } else {
      return "light"
    }
}

export const ThemeProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const KEY = "theme";
    const [theme, setThemeState] = useState<Theme>(getInitialTheme(KEY));
    if (theme === "dark") {
      document.body.classList.add("dark")
    }

    function setTheme(newTheme: Theme) {
      setThemeState(newTheme)
      localStorage.setItem(KEY, newTheme)
      // Inform Tailwind to use dark mode
      if (newTheme === "dark") {
        document.body.classList.add("dark")
      } else {
        document.body.classList.remove("dark")
      }
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}