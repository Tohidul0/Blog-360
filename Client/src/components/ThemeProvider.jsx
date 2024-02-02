import React from 'react';
import { useSelector } from 'react-redux';




function ThemeProvider({children}) {
    const {theme}= useSelector(state => state.theme)
    return (
        <div className={theme}>
            <div className='bg-white text-gray dark:bg-slate-900 dark:text-white min-h-screen'>
                {children}
            </div>
            
        </div>
    );
}

export default ThemeProvider;