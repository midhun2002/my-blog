import React from 'react'
import './BlogHeader.css'
import {Link} from 'react-router-dom'
function BlogHeader({post}) {
    return (
        <div className="post" id={post._id} >
            <h6>
                <Link to={`/posts/${post._id}`}>{post.Title}</Link>
            </h6>
            <h6>{post.Tag}</h6>
            <h6>{post.updatedAt}</h6>
        </div>
    )
}

export default BlogHeader

