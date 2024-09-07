import './App.css';
import React,{useState} from 'react'
import Navbar from './component/Navbar';
import News from './component/News.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App=()=> {
 const [progress, setProgress] = useState(0)
  // state={
  //  progress:0
  // }

  // setProgress=(progress)=>{
  //   setState({progress: progress})
  // }

 
    return (
        <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Switch>
        <Route exact path="/"><News setProgress={setProgress}key="general" pageSize={5}country="in" category="general"/></Route> 
          <Route exact path="/business"><News setProgress={setProgress}key="business" pageSize={5}country="in" category="business"/></Route> 
          <Route exact path="/sports"><News setProgress={setProgress}key="sports" pageSize={5}country="in" category="sports"/></Route> 
          <Route exact path="/health"><News setProgress={setProgress}key="health"pageSize={5}country="in" category="health"/></Route> 
          <Route exact path="/technology"><News setProgress={setProgress}key="technology"pageSize={5}country="in" category="technology"/></Route> 
          <Route exact path="/general"><News setProgress={setProgress}key="general" pageSize={5}country="in" category="general"/></Route> 
          <Route exact path="/science"><News setProgress={setProgress}key="science" pageSize={5}country="in" category="science"/></Route>  
          <Route exact path="/entertainment"><News setProgress={setProgress}key="business" pageSize={5}country="in" category="entertainment"/></Route>
        </Switch>
        </Router>
      </div>
    )
  }
  export default App;
