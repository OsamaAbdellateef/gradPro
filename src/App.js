import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from './components/header/header.component';
import Carousel from './components/carousel/carousel.component';
import {HashRouter, Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import SignIn from './components/sign-in/sign-in.component';
import SignPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import About from './pages/about/about';
import Footer from './components/footer/footer.component';
import IconButton from './components/icon-button/icon-button.component'
import { auth, createUserProfileDocument } from './../src/firebase/firebase.utils';
import IctonButotn from './components/icon-button/icon-button.component';
import Signup from './components/signup/signup.component';
import ContactUs from './components/contact-us/contact-us.component';
//import CraftPreview from './components/craft-preview/craft-preview.component';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import SpinnerComp from './components/spinner/spinner.component';
import Posts from './pages/posts/posts.component';
import RequestsList from './components/requests-list/requests-list.component';

const Home = lazy(() => import('./pages/homePage/Home'));
const CraftPreview = lazy(() => import('./components/craft-preview/craft-preview.component'));

class App extends React.Component {


  componentDidMount() {
    
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }

      setCurrentUser(userAuth
      );
      createUserProfileDocument(userAuth);
    });
     
  }

  render() {
    return (
      <div className="App">
        <Suspense fallback={<SpinnerComp />}
        >
          <Header />
          <HashRouter>


            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={Posts} />
            <Route
              exact
              path="/signin"
              render={() => this.props.currentUser ?
                (<Redirect to='/' />)
                : (<SignIn />)} />

            <Route path="/about" component={About} />
            <Suspense fallback={<SpinnerComp />}>
              <Route path={`/crafts/:categoryId`} component={CraftPreview} />
            </Suspense>
            <Route exact
              path="/signup"
              render={() => this.props.currentUser ?
                (<Redirect to='/' />) :
                (<Signup />)} />
            <Route exact path="/contact-us" component={ContactUs} />

          </HashRouter>
          <Footer />
        </Suspense>

      <RequestsList />
      <h1>hello</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
    myCrafts: user.myCrafts

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user),
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
