import {Provider} from "react-redux"
import store from "./Components/store/store"
import {Container, Typography, ThemeProvider, Popper} from "@mui/material"
import AddHabitForm from "./Components/store/add-habits-from";
import HabitList from "./Components/store/habit-list";
import HabitStats from "./Components/store/habits-stats";


function App() {
  return (
    <Provider store={store}>
      
     <Container maxWidth="md">
      <Typography component="h1" variant="h2" align="center" fontWeight="bold" fontFamily={"sans-serif"}>
        Habit Tracker
       
      </Typography>
      <AddHabitForm/>
      <HabitList/>
      <HabitStats/>
     </Container>
     
    </Provider>
    
  );
}

export default App;


