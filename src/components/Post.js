import React, {useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery,QueryClient } from 'react-query'

const queryClient = new QueryClient()
const preFetchRepos = async () =>{
  const response = await fetch(`https://api.github.com/users/mojombo/repos`)
  const jsonResponse = await response.json()
  //jsonResponse.title = `${jsonResponse.title} - ${Math.random().toString(36)}`

  await new Promise(r => setTimeout(r, 10)) // wait a second
  console.log(jsonResponse.length)
  return jsonResponse
}

const prefetchReps = async () => {
  // The results of this query will be cached like a normal query;
  await queryClient.prefetchQuery('preFetch', preFetchRepos);
}
const preFetchData = () =>{
  prefetchReps();
}
preFetchData();
const Post = ({ login }) => {
  const [repos,setRepos] = useState([]);
  const [showRepo,setShowRepos] = useState(false);
  const [demo,setDemo] =useState(false);
  //const { status:statuss, data:repos, isFetching:isFetchingg, error } = useQuery('preFetch', preFetchRepos,{staleTime:100000,cacheTime:10000});
  
  const getPost = async () => {
    const response = await fetch(`https://api.github.com/users/${login}`)
    const jsonResponse = await response.json()
    jsonResponse.title = `${jsonResponse.title} - ${Math.random().toString(36)}`

    await new Promise(r => setTimeout(r, 10)) // wait a second
    setRepos(jsonResponse);
    return jsonResponse
  }

  const demo999 =  () =>{
    //await new Promise(r => setTimeout(r, 10000)) // wait a second
      // const { data:d2 }= useQuery('postmethod', () => PostMethod(userInfo))
      // const {  data:d3 }= useQuery('postmethoddd', () => PostMethod(userInfo2))
  }
  // useEffect(()=>{
  //   // prefetchReps();
  //   // setTimeout(()=>{
      
  //   // },10000);
  //   demo();
    
  // },[])

  const PostMethod = async (param) => {
    console.log("PostMethod",param)
    
    const response = await fetch(`https://reqres.in/api/users`,{
      method:'POST',
      body:JSON.stringify(param)
    })
    const jsonResponse = await response.json()
    jsonResponse.title = `${jsonResponse.title} - ${Math.random().toString(36)}`

    await new Promise(r => setTimeout(r, 10)) // wait a second
    console.log('jsonResponse in PostMethod',jsonResponse)
    //setRepos(jsonResponse);
    return jsonResponse
  }

  const clickHandler = () =>{
    setShowRepos(true)
  }

  const prefetchTodos = async () => {
    // The results of this query will be cached like a normal query
    await queryClient.prefetchQuery('todos', PostMethod)
  }
  //https://reqres.in/api/users

  const postFunc = (reqBody) =>{
    //const url = 'https://reqres.in/api/users';

    //return useQuery('postmethod', PostMethod,{staleTime:100000,cacheTime:100000})
    
  }

  
  const { status, data, isFetching } = useQuery(`post-${login}`, getPost,{staleTime:100000,cacheTime:100000})
  //postFunc()
  const userInfo = {
    "name": "morpheus",
    "job": "leader"
}

const userInfo2 = {
  "name": "hellooo",
  "job": "leader"
}
  //const { status, data, isFetching }= useQuery('postmethod', () => PostMethod(userInfo),{staleTime:10000,cacheTime:10000})
  const {  data:d1 }= useQuery('postmethoddd', () => PostMethod(userInfo2),{staleTime:10000,cacheTime:10000})
  if (status === 'loading') {
    return <div>loading...</div> // loading state
  }
  console.log('after useQuery',data,d1);
  return (
    <div>
      <button onClick={() =>setDemo(!demo)}>Hello</button>
      <NavLink to="/">Home</NavLink>
      <h1>{data.id}</h1>
      <p>{data.name}</p>
      <img src={data.avatar_url}  alt="No image"/>
      { isFetching && <p>updating...</p> }
      <br />
      
      <button onClick ={clickHandler} disabled ={showRepo}>Click to Display Pre Fetched Repos</button>
  { showRepo && (<code>{JSON.stringify(repos)}</code>)

      }
    </div>
  )
}

export default Post
