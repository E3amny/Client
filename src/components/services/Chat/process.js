import { useSelector } from "react-redux";

function Process() {
  const state = useSelector((state)=> state.ProcessReducer)

  return (
      <div>
          <h5>Secret Key: <span>uI2ooxtwHeI6q69PS98fx9SWVGbpQohO</span></h5>
          <div>
             <h4>Incoming Data</h4>
             <p>{state.cypher}</p> 
          </div>
          <div>
             <h4>Decrypt Data</h4>
             <p>{state.text}</p> 
          </div>
      </div>
  )
}
export default Process;
