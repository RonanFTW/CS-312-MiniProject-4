import React, {UseState} from "react";
import axios from "axios";

const BlogPostForm = () => {
    const [bptitle, stitle] = useState('');
    const [bpname, sname] = useState('');
    const [bpcontent, scontent] = useState('');

    const psub = async (event) => {
        event.preventDefault();
        try {
            const postblog = await axios.post('http://localhost:8000/pblog', {bptitle, bpname, bpcontent});
            stitle('');
            sname('');
            scontent('');
            console.log(postblog.data);
        } catch (err) {
            console.error("*explosion sounds*", err);
        }
};

return (
    <div className="ccontent">
        <p><b>Create new post:</b></p>
        <form sub={psub}>
        <input className="namef" type="text" name="blogT" placeholder="Title Here!"
            value={bptitle} onChange={(event) => stitle(event.target.value)}>
            </input>
        <input className="titlef" type="text" name="blogN" placeholder="Name Here!"
            value={bpname} onChange={(event) => sname(event.target.value)}>
            </input>
        <textarea name="blogC" placeholder="Whatever is on your mind here" spellCheck="true"
            value={bpcontent} onChange={(event) => scontent(event.target.value)}>
            </textarea>
        <input type="submit" value="Post Blog" className="postB" >
        </input>
    </form>
    </div>
);
};
export default BlogPostForm;