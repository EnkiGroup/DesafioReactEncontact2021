import { GlobalStyle } from './styles/global'
import { TasksProvider } from "./hooks/useTasks";

import { Dashboard } from './components/Dashboard'

export default function App() {

  return (
    <TasksProvider>
      <Dashboard />

      <GlobalStyle />
    </TasksProvider>
  );
}
