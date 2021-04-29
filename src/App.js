import React from 'react'
import { useQuery } from 'react-query'
import { useIsFetching } from 'react-query'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Post from './components/Post'
 
 
 
//  function App() {
//    return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
//  }



function App() {
  // const isFetchingPosts = useIsFetching(['posts'])
  // console.log ('isFetchingPosts',isFetchingPosts);
  //console.log('Rendered APp');
  return (
    <div>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path = '/users/:id' render = {routerProps => <Post login={routerProps.match.params.id}/>} />
      </Switch>
    </Router>
    </div>
  )
}

export default App
