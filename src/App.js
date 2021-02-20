import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

// The below extended import with addCollectionAndDocuments was only need for the shop data JSON import to firestore
//import addCollectionAndDocuments, auth, createUserProfileDocument from './firebase/firebase.utils';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// The below import was only need for the shop data JSON import to firestore
//import selectCollectionsForPreview from './redux/shop/shop.selectors';

class App extends React.Component {
    unsubscribeFromAuth = null;

    

    componentDidMount() {

      // The below line with the collectionsArray reference was only used once to load the JSON data to firestore
      //const setCurrentUser, collectionsArray = this.props;
      const {setCurrentUser} = this.props;

      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
// onSnapshot is from firestore document.reference object that provide a .data object with you user details
          userRef.onSnapshot(snapShot => {
            setCurrentUser(
              {
                id: snapShot.id,
                 ...snapShot.data()
                }
              );
          });
        }

      setCurrentUser(userAuth);
      // Below line is a 1-time use that will load our JSON shop data into Firebase, where we selectively
      // choose only the title field and items field from our JSON, since the Route and manual ID fields are not needed
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
     });
    }

    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }
    
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>     
      </div>
    );
  }  
}

// Below 4 lines are only for an initial load of JSON data to firestore
//const mapStateToProps = createStructuredSelector({
  //currentUser: selectCurrentUser, 
  //collectionsArray: selectCollectionsForPreview
//});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
