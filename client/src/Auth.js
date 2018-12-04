/*
  AuthService

  - Handles requests for authentication
  - Stores user auth status
  - Manages auth tokens

  Use wherever you need to check user's auth status.

  Source: https://github.com/code-workshops/react_demo/tree/master/src
 */
import axios from 'axios';

class AuthService {
  constructor() {
    this.state = {
      isAuthenticated: false,
      isAuthorized: false
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  login(user) {
    let url = 'http://localhost:5000/login';
    axios.post(url, user)
      .then((res) => {
        console.debug(res.data);
        // TODO: Store user!
        // this.setState({ isAuthenticated: !!res.data.id });
      });
    // Testing only. In prod we would let the request above update the state
    // this.setState({ isAuthenticated: true, isAuthorized: true })
  }

  signup(user) {
    let url = 'http://localhost:5000/signup';
    user = JSON.stringify(user);
    console.log("Signup User: %s", user);
    axios.post(url, user)
      .then((res) => {
        console.log(res.data);
        let authenticated = !!res.data;
        // this.isAuthenticated = authenticated
        // TODO: Store user!!
      }).catch((err)=> {
        console.error(err)
    })
    // Testing only. In prod we would let the request above update the state
    // this.isAuthenticated = true;
    // this.isAuthorized = true;
  }

}


export default AuthService;