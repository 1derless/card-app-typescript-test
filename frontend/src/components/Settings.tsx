import { ThemeContext } from '../utilities/globalContext'
import { useContext, useRef } from "react";
import type { Theme } from '../@types/context.d.ts'

function Settings() {
    const defaults = {  // used if ThemeContext is yet uninitialised
        theme: "light",
        setTheme: () => {},
    };
    const { theme, setTheme } = useContext(ThemeContext) || defaults;
    const dialogRef = useRef<HTMLDialogElement>(null);

    function toggleDarkMode() {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    function openDialog() {
        dialogRef.current?.showModal();
    }

    function closeDialog() {
        dialogRef.current?.close();
    }

    return (
        <>
            <button onClick={openDialog} className="relative m-3 p-2 text-l rounded-full font-medium bg-gray-400 hover:bg-gray-500 text-white dark:bg-gray-700 dark:hover:bg-gray-600 text-gray">
                ⚙ <span>Settings</span>
            </button>
            <dialog
                ref={dialogRef}
                onClick={closeDialog}
                onCancel={closeDialog}
                className="bg-gray-200 shadow-md shadow-gray-500 rounded dark:bg-gray-900 dark:text-white"
            >
                <section
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col justify-between"
                >
                <h1 className="font-bold text-sm md:text-lg">Settings</h1>
                <div className="flex gap-3">
                    <input
                        id="settings-dialog-darkmode"
                        type="checkbox"
                        onChange={toggleDarkMode}
                        checked={theme === "dark"}
                    />
                    <label htmlFor="settings-dialog-darkmode" className="text-lg font-light">Dark mode</label>
                </div>
                </section>
            </dialog>
        </>
    );
}

export default Settings;