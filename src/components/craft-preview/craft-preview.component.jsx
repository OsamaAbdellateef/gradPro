import React, {Suspense , lazy} from 'react';
import './craft-preview.style.scss';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { set_state } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
//import CraftCard from '../craft-card/craft-card.component';
import Skeleton from 'react-loading-skeleton';
import spinnerComp from '../spinner/spinner.component';
import SpinnerComp from '../spinner/spinner.component';
const CraftCard = lazy(() => import( '../craft-card/craft-card.component'));
 
const firestore = firebase.firestore();


class CraftPreview extends React.Component {



    async componentDidMount() {
        const {set_state} = this.props;
        // const events = await firebase.firestore().collection('events')
        // events.get().then((querySnapshot) => {
        //     const tempDoc = []
        //     querySnapshot.forEach((doc) => {
        //        tempDoc.push({ id: doc.id, ...doc.data() })
        //     })
        //     console.log(tempDoc)
        //  })
         var  usersRef = await firestore.collection("users").get().then(console.log("hello there "));
        var users = usersRef.docs.map(doc => doc.data());
        // var workers = users.filter(user => user.signedAs == "worker");
        var nUsers = usersRef.docs.forEach((doc) => {return doc.data()});
        
        console.log("Ddddddddddd"  ,nUsers);
        
        //Real time database 
        

        // var electrician = users.filter(user => user.signedAs == "worker" && user.craft == "كهربائي");

        // var plumber = users.filter(user => user.signedAs == "worker" && user.craft == "سباك");


        // var mahar = users.filter(user => user.signedAs == "worker" && user.craft == "محار");
        
        var mC = users.filter(user => user.signedAs == "worker" && user.craft == this.props.match.params.categoryId);


    
        
        set_state("myCrafts" , mC);
        
        // set_state("workers", workers);
        // //set_state("electrician" , electrician);
        
        // set_state("plumber" , plumber);
        // set_state("mahar" , mahar);

        // console.log(electrician);
        // console.log(mahar);
        // console.log(plumber);
        // console.log("MCCCCCCCCCC : "  , mC);  
        
    }


    handle = async () => {
        // const {set_state} = this.props;
        // // const events = await firebase.firestore().collection('events')
        // // events.get().then((querySnapshot) => {
        // //     const tempDoc = []
        // //     querySnapshot.forEach((doc) => {
        // //        tempDoc.push({ id: doc.id, ...doc.data() })
        // //     })
        // //     console.log(tempDoc)
        // //  })
        // var usersRef = await firestore.collection("users").get().then(console.log("hello there "));
        // var users = usersRef.docs.map(doc => doc.data());
        // // var workers = users.filter(user => user.signedAs == "worker");
        
        // //Real time database 
        // firestore.collection("users").onSnapshot(function(querySnapshot) {
        //     querySnapshot.forEach(doc => {
        //         console.log(doc.data().displayName);
                
        //     })
            
            
        // });

        // // var electrician = users.filter(user => user.signedAs == "worker" && user.craft == "كهربائي");

        // // var plumber = users.filter(user => user.signedAs == "worker" && user.craft == "سباك");


        // // var mahar = users.filter(user => user.signedAs == "worker" && user.craft == "محار");
        
        // var mC = users.filter(user => user.signedAs == "worker" && user.craft == this.props.match.params.categoryId);


    
        
        // set_state("myCrafts" , mC);
        
        // // set_state("workers", workers);
        // // //set_state("electrician" , electrician);
        
        // // set_state("plumber" , plumber);
        // // set_state("mahar" , mahar);

        // // console.log(electrician);
        // // console.log(mahar);
        // // console.log(plumber);
        // // console.log("MCCCCCCCCCC : "  , mC);  
        
    }
    render() {
        const crafts  = this.props.myCrafts;
        return (

            <div className="craft-preview container">
                <h3 className="" style={{ margin: "75px 0px 22px"}} >{this.props.match.params.categoryId == "كهربائي" ? 'قسم الكهرباء' : null}</h3>
            <div className="row" >
                {this.props.myCrafts.map(worker => (
                    <Suspense fallback={<Skeleton height={100} width={100} />}>
                         <CraftCard  
                         key={Math.random}
                        imageCraftURL={worker.imageCraftURL} displayName={worker.displayName} address={worker.address} 
                        phoneNumber={worker.phoneNumber} 
                        crafterID={worker.userID}
                        imagePersonalURL={worker.imagePersonalURL} craft = {worker.craft} />
                    </Suspense>
                ))                
                }
                {console.log('category id: ' , this.props.match.params.categoryId)}
                         
            </div >
            </div>
        )
    }

}

const mapStateToProps = ({ user }) => ({
    workers: user.workers,
    plumber: user.plumber,
    electrician: user.electrician,
    myCrafts:user.myCrafts
})

const mapDispatchToProps = (dispatch) => ({
    set_state: (stateName, value) => dispatch(set_state(stateName, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(CraftPreview);