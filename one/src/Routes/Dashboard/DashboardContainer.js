import auth from "../../Auth";
import DashboardPresenter from "./DashboardPresenter"

const DashboardContainer = ({match}) => {
    console.log(match);
    return(
        <>  
            <DashboardPresenter match={match}></DashboardPresenter>
            
        </>
    )
}




export default DashboardContainer;