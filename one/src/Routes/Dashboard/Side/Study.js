import { AnimatePresence,motion } from "framer-motion"


const Study = ({ match, history }) => {
    return(<motion.div exit={{opacity:0}} animate={{opacity:1}} initial = {{opacity:0}}><div>Study</div></motion.div>)
}

export default Study;
