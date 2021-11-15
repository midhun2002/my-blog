import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BlogHeader from './Blogheader'
import './Home.css'
import {Link} from 'react-router-dom'
function Home() {
    const [posts,setPosts] = useState([])
    const [nav,setNav] = useState("")
    const [tags,setTags] = useState({})
    const [topic,setTopic]= useState([])
    useEffect(()=> {
        axios.get('https://beginner-blog.herokuapp.com/posts')
        .then(res=>{handleTags(res.data)})
        .catch(err=>console.log(err))
    }, [])
    const handleTags = (Data)=>{
      Data.map(data =>{ let topics = tags; !(data.Tag in tags) ? topics[[data.Tag]] = 1 : topics[data.T]+=1; setTags(topics)
      })
      setTopic(Data);
      setPosts(Data);
      return ;
    }
    const handleSearch = (Tag)=>{
        let temptopics = posts.filter(post => post.Tag===Tag)
        setTopic(temptopics);
    }
    const handleNav = (e) =>{
          setNav(e.target.value);     
          return; 
    }
    return (
        <div className="Home">
          <div className="home-header">
              <h1>Technical Blog</h1>
              <input id="search-bar" value={nav} onChange={(e)=>handleNav(e)} autoComplete="on" placeholder="Search any topic"></input>         
          </div>
          <div className="home-container">
            <div className="Ads">ADS</div>
            <div className="blog-content">{topic.map((post)=> <BlogHeader post={post} key={post._id}></BlogHeader>)}</div>
            <div className="Tags">
               <h3 className="tag-headline">Check for Tags</h3>
               <div className="all-tags">
                  {
                    Object.keys(tags).map((key,value) => 
                      <div className="flex-tag">
                        <div className="tag-container">
                          <button key={key} onClick={()=>handleSearch(key)} className="Taginfo">{key}</button>
                          <div className="count-bar">{tags[key]}</div>
                        </div>
                      </div>
                    )
                  }
              </div>
            </div>
          </div> 
          <button id="postbtn"><Link to="/postblog">Create new post</Link></button>  
        </div>     
    );
}

export default Home