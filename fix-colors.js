const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');
code = code.replace(/dark:text-\[#f8fafc\]/g, 'dark:text-white');
code = code.replace(/dark:text-\[#94a3b8\]/g, 'dark:text-slate-300');
code = code.replace(/bg-slate-50\/50 dark:bg-\[#030303\] border-y border-slate-200 dark:border-white\/5/g, 'bg-transparent');
fs.writeFileSync('src/App.jsx', code);
