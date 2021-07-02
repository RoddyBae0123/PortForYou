import React, { useEffect, useState } from  "react";
import SignupPresenter  from "./SignupPresenter";
import axios from "axios";
import wifi from "../../wifi";
import { AnimatePresence,motion } from "framer-motion"


const SignupContainer = (props) => {

    const errorMessage = "";
    const {history:{push}} = props;
    
   
    

    
    


    return(<motion.div exit={{opacity:0}} animate={{opacity:1}} initial = {{opacity:0}}>
        <SignupPresenter push={push}></SignupPresenter>
    </motion.div>
    
    )
}


export default SignupContainer;