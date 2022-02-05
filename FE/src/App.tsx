import JoinRoom from "./components/JoinRoom";
import { CreateRoom } from "./components/CreateRoom"
import { Room } from "./components/Room";
import { NotFound } from "./components/NotFound";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import uniqid from 'uniqid'

function App() {


  const createRoom = () => {
    //TODO: get all current rooms from db
    //Check if generated ID is the same as one of current rooms
    
    console.log(uniqid())
  }
  //TODO: check on /:id if id exists, else go to NotFound
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            <>
              <CreateRoom createRoom={ createRoom }/>
              <JoinRoom/>
            </>
          )} />
          <Route exact path='/room/:id' render={() => (
            <>
              <Room />
            </>
          )} />
          <Route exact path ='/notfound' component={NotFound} />
          </Switch>
        </Router>



    </div>
  );
}

export default App;
