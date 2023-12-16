'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';
import { TodoItem, TodoItemMode } from '@/components/TodoItem';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.querySelector('html')?.classList.toggle('dark');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold text-body-text">TODO</h1>
      <Button onClick={toggleDarkMode}>
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </Button>
      <TodoItem mode={TodoItemMode.READ} value="Test only" />
    </main>
  );
}
