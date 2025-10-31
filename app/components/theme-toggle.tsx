// 'use client';

// import * as React from 'react';
// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from 'next-themes';

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <button
//       aria-label="Toggle theme"
//       onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
//       className="absolute top-6 right-6 p-2 rounded-md transition-colors
//                  text-slate-500 hover:text-slate-900 
//                  dark:text-slate-400 dark:hover:text-slate-100"
//     >
//       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <Moon className="absolute top-2 right-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       <span className="sr-only">Toggle theme</span>
//     </button>
//   );
// }