import { NotesList } from "./components/NotesList";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const App = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <QueryClientProvider client={queryClient}>
        <NotesList />
      </QueryClientProvider>
    </div>
  );
};

export default App;
