import React, {UseState} from "react";
import axios from "axios";

const InForm = () => {
    const [idi, sidi] = useState('');
    const [passi, spassi] = useState('');

    const psub = async (event) => {
        event.preventDefault();
        try {
            const signin = await axios.post("http://localhost:8000/signin", {
                idi,
                passi,
            });
            console.log(signin.data);
        } catch (err) {
            console.error("*explosion noises*", err);
        }
    };
    return (
        <div className="ccontent">
            <h1>Welcome Back!</h1><br></br>
            <h2>Sign in:</h2>
            <form sub = {psub}>
                <input className="namef" name="idi" type="text" placeholder="User ID"
                value={idi} onChange={(event) => sidi(event.target.value)}>
                </input>
                <input className="namef" name="passi" type="text" placeholder="Password"
                value={passi} onChange={(event) => spassi(event.target.value)}>
                </input>
            </form>
        </div>
    );
}
export default InForm;