import React, {useEffect, useState} from "react";
import axios from "axios";

const PostList = () => {
    const [bpost, setbposts] = useState([]);

    useEffect(() => {
        const fetchP = async () => {
            try {
                const fetcher = await axios.get('http://localhost:8000/posts');
                setbposts(fetcher.data);
            } catch (err) {
                console.error("*explosion sounds*", err);
            }
        };
        fetchP();
    }, []);
    
    return (
        <div className="imain">
            <p><b>Blog Overview</b></p>
            {bpost.length === 0 ? (
                <p>None currently available for reading</p>
            ) : (
                bpost.map(post => (
                    <div className="content" key={post.blog_id}>
                        <p><b>{post.title}</b></p>
                        <p className="auth">By: {post.creator_name}</p>
                        <p>- {post.body}</p>
                        <p className="smallt">Posted: {post.date_created}</p>

                        <div className="editf">
                            <button className="ediB" onClick={() => {
                                document.getElementById(`editB${post.blog_id}`).style.display='block';
                            }}>Edit Post</button>
                            <form id={`editB${post.blog_id}`} action="/edit" method="post" style={{ display: 'none' }}>
                                <input type="hidden" name="id" value={post.blog_id} />
                                <div className="editT">
                                    <label htmlFor={`editT${post.blog_id}`}>Change Title: </label>
                                    <input id={`editT${post.blog_id}`} type="text" name="blogT" defaultValue={post.title} className="editt" />
                                </div>
                                <div className="editN">
                                    <label htmlFor={`editN${post.blog_id}`}>Change Name: </label>
                                    <input id={`editN${post.blog_id}`} type="text" name="blogN" defaultValue={post.creator_name} className="editn" />
                                </div>
                                <div className="editC">
                                    <label htmlFor={`editC${post.blog_id}`}>Change Blog Content: </label>
                                    <textarea id={`editC${post.blog_id}`} name="blogC" defaultValue={post.body} spellCheck="true" className="editc"></textarea>
                                </div>
                                <input className="scB" type="submit" value="Save Changes" />
                            </form>
                            <form action="/del" method="post">
                                <input type="hidden" name="id" value={post.blog_id} />
                                <input type="submit" value="Delete Post" className="delB" />
                            </form>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
export default PostList;
