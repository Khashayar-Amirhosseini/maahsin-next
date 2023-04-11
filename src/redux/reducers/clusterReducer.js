const { clusterActionTypes } = require("../types");
const ClusterInitialState={
    Clusters:[]
};
const ClusterReducer=(state=ClusterInitialState,action)=>{
    switch (action.type){
        case clusterActionTypes.ADD_CLUSTERS:{
            const newState={...state,Clusters:[...state.Clusters].concat(action.clusters)}
            return newState;
        }
        case clusterActionTypes.REMOVE_CLUSTER:{
            const newCluster=[...state.Clusters].filter(d=>d.id!==action.index)
            return {...state,Clusters:newCluster}
        }
        case clusterActionTypes.UPDATE_CLUSTER:{
            const newCluster=[...state.Clusters].filter(d=>d.id!==action.cluster.id)
            newCluster.concat(action.cluster)
            return{...state,Clusters:newCluster}
        }
        default:{
            return state;
        }
    }
   
}
export default ClusterReducer;