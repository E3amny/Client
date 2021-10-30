export const process = (encrypt,text,cypher)=>{
    return {
        type:"PROCESS",
        payload:{
            encrypt,
            text,
            cypher
        }
    }
}
export default process

//====================================================== reducers ==========================================

export const ProcessReducer = (state={} , {type , payload})=>{
    switch (type){
        case "PROCESS":
            return {...payload}
        
        default:
            return state
    }
}