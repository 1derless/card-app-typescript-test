import {NavLink} from 'react-router-dom'

export default function NavBar(){
    const classList = "m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white dark:bg-blue-500 dark:hover:bg-blue-700"
    return(
      <nav className="flex justify-center gap-5">
        <NavLink to={'/'} className={classList}>All Entries</NavLink>
        <NavLink to={'/create'} className={classList}>New Entry</NavLink>
      </nav>
    )
}