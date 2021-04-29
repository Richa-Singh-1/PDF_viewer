import React , {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useIsFetching } from 'react-query'

const getPosts = async () => {
  console.log('Called 1');
  const response = await fetch('https://api.github.com/users')
  await new Promise(r => setTimeout(r, 10)) // wait a second
  return response.json()
};

const getPosts2 = async () => {
  console.log('Called 2');
  const response = await fetch('https://api.github.com/users')
  await new Promise(r => setTimeout(r, 10)) // wait a second
  return response.json()
};

const getPosts3 = async () => {
  console.log('Called 3');
  const response = await fetch('https://api.github.com/users')
  await new Promise(r => setTimeout(r, 10)) // wait a second
  return response.json()
};

function Home() {
  const [criteria, setCriteria] = useState('Richa');
  const { status, data, isFetching, error } = useQuery(['posts',criteria.length>5], getPosts,{staleTime:10000,cacheTime:1000000})
  // const { status2, data2, isFetching2, error2 } = useQuery(['common','hello'], getPosts2,{refetchOnWindowFocus:false})
  // const { status3, data3, isFetching3, error3 } = useQuery(['common','posts'], getPosts3,{refetchOnWindowFocus:false})
  //const { status, data, isFetching, error } = useQuery(['common','postss'], getPosts3,{refetchOnWindowFocus:false})

  
  //const isFetchingPosts = useIsFetching(['posts'])
  // const isFetchingPosts2 = useIsFetching(['hello'],{exact:false})
  //{queryKey:['posts','post2']}
  
  // useEffect(()=>{
    //console.log ('isFetchingPosts home',isFetchingPosts);
  // },[isFetchingPosts]);
  
  const isFetchingPosts = useIsFetching(['common'])
  console.log ('isFetchingPosts home',isFetchingPosts);
  if (status === 'loading') {
    //setCriteria(true);
    return <div>loading...</div> // loading state
  }


  if (status === 'error') {
    return <div>{error.message}</div> // error state
  }

  const handleChange = (event) =>{
    setCriteria(event.target.value);
  }
  const clickHandler = () => {
    console.log('Click');
    getPosts();
  }

  

  return (
    <div>
      <button onClick ={clickHandler}>React Query</button>
      <input type="text" value={criteria} onChange={handleChange} />
      { data && <ul>{
        data
          .slice(0,10) // only take frist 10 for now
          .map(d => <li key={`post-${d.login}`}>
            <NavLink to={`/users/${d.login}`}>{d.login}</NavLink>
          </li>) // render list of titles
      }</ul> }
      { isFetching && <p>updating...</p> }
    </div>
  );
}

export default Home


/*

// Get the user
 const { data: user } = useQuery(['user', email], getUserByEmail)
 
 const userId = user?.id
 
 // Then get the user's projects
 const { isIdle, data: projects } = useQuery(
   ['projects', userId],
   getProjectsByUser,
   {
     // The query will not execute until the userId exists
     enabled: !!userId,
   }
 )




*/