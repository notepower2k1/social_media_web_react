import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import Register from "../Register/Register"
=======

>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
import AuthService from "../../services/auth.service";
import { required } from "../../utils/Validate";
import Register from "../Register/Register";

<<<<<<< HEAD
function Login() {
    const dispatch = useDispatch();
=======
const Login = () => {
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
    let navigate = useNavigate();

    const Loginform = useRef();
    const checkBtn = useRef();

    const [isRegistered,setIsRegistered] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
    };

    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
    };

    const handleLogin = (event) => {
        event.preventDefault();
    
        setMessage("");
        setLoading(true);
    
        Loginform.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
			AuthService.login(username, password).then(
				() => {
					navigate("/");
					window.location.reload();
				},
				(error) => {
					const resMessage =
						(error.response &&
						error.response.data &&
						error.response.data.message) ||
						error.message ||
						error.toString();
		
					setLoading(false);
					setMessage(resMessage);
				}
			);
        } else {
            setLoading(false);
        }
    };

    return (
<<<<<<< HEAD
		<div className="row merged">
=======
        <div className="row merged">
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
			<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div className="land-featurearea">
					<div className="land-meta">
						<h1>Winku</h1>
						<p>
							Winku is free to use for as long as you want with two active projects.
						</p>
						<div className="friend-logo">
							<span><img src="images/wink.png" alt=""/></span>
						</div>
					</div>	
				</div>
			</div>
		
<<<<<<< HEAD
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div className="login-reg-bg">  
        {!isRegistered
        ? <div className="log-reg-area sign">
        <h2 className="log-title">Login</h2>
          
          <Form onSubmit={handleLogin} ref={Loginform}>

          <div className="form-group">
                  <label className="control-label" htmlFor="username"></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                    placeholder="Username"
                  />
              </div>

              <div className="form-group">
                  <label className="control-label" htmlFor="password"></label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                    placeholder="Password"
                  />
              </div>
              {message && (
                  <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                      {message}
                  </div>
                  </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
        
          <div className="submit-btns">

                  <button className="mtr-btn signin mr-3" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
            <button className="mtr-btn signup" type="button" onClick={() =>setIsRegistered(prev => !prev)}><span>Register</span></button>
          </div>
          </Form>
          </div>
        :<div class="log-reg-area">
        <Register setIsRegistered={setIsRegistered}/>
        </div>
        }
       
      
          
			
        


        
				</div>
			</div>

		</div>
	
    
=======
      		<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div className="login-reg-bg">  
					{
						!isRegistered
						? 	<div className="log-reg-area sign">
								<h2 className="log-title">Login</h2>
								<Form onSubmit={handleLogin} ref={form}>

									<div className="form-group">
										<label className="control-label" htmlFor="username"></label>
										<Input
											type="text"
											className="form-control"
											name="username"
											value={username}
											onChange={onChangeUsername}
											validations={[required]}
											placeholder="Username"
										/>
									</div>

									<div className="form-group">
										<label className="control-label" htmlFor="password"></label>
										<Input
											type="password"
											className="form-control"
											name="password"
											value={password}
											onChange={onChangePassword}
											validations={[required]}
											placeholder="Password"
										/>
									</div>
									{
										message && (
											<div className="form-group">
												<div className="alert alert-danger" role="alert">
													{message}
												</div>
											</div>
										)
									}
									<CheckButton style={{ display: "none" }} ref={checkBtn} />
								
									<div className="submit-btns">

											<button className="mtr-btn signin mr-3" disabled={loading}>
												{loading && (
													<span className="spinner-border spinner-border-sm"></span>
												)}
												<span>Login</span>
											</button>
										<button className="mtr-btn signup" type="button" onClick={() =>setIsRegistered(prev => !prev)}><span>Register</span></button>
									</div>
								</Form>
							</div>
						:	<div class="log-reg-area">
								<Register setIsRegistered={setIsRegistered}/>
							</div>
					}
				</div>
			</div>
		</div>
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
    )
}

export default Login;