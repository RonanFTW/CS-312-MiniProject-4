import React, {UseState} from "react";
import axios from "axios";

const UpForm = () => {
    const [nameu, sname] = useState('');
    const [passu, spass] = useState('');
    const [idu, sidu] = useState('');

    const psub = async (event) => {
        event.preventDefault();
        try {
            const signup = await axios.post("http://localhost:8000/signup", {
                nameu,
                passu,
                idu,
            });
            console.log(signup.data);
        } catch (err) {
            console.error("*explosion sounds*", err);
        }
    };

    return (
        <div className="ccontent">
            <h1>Sign-Up Here!</h1>
            <form sub={psub}>
                <input className="namef" name="nameu" type="text" 
                placeholder="Come up with a name" value={nameu}
                onChange={(event) => sname(event.target.value)}>
                </input>
                <input className="namef" name="passu" type="text" 
                placeholder="Come up with a name" value={passu}
                onChange={(event) => spass(event.target.value)}>
                </input>
                <input className="namef" name="idu" type="text" 
                placeholder="Come up with a name" value={idu}
                onChange={(event) => sidu(event.target.value)}>
                </input>
            </form>
        </div>
    );
}
export default UpForm;