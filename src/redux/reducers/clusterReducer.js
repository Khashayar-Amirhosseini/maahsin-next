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
            return{...state,Clusters:newCluster.concat(action.cluster)}
        }
        case clusterActionTypes.ADD_SUB_SERVICES:{
            const newCluster=[...state.Clusters].filter(c=>c.id===action.index)[0];
            const newServices=[...newCluster.services].concat(action.subServices);
            newCluster.services=newServices
            const updatedClusters=[...state.Clusters].filter(d=>d.id!==action.index);
            return{...state,Clusters:updatedClusters.concat(newCluster)}
        }
        case clusterActionTypes.UPDATE_SUB_SERVICE:{
            const newCluster1=[...state.Clusters].filter(c=>c.id===action.index)[0];
            const newServices1=[...newCluster1.services].filter(c=>c.id!==action.subService.id);
            const newCluster2={...newCluster1, services:newServices1.concat(action.subService)}
            const updatedClusters=[...state.Clusters].filter(d=>d.id!==action.index);
            return{...state,Clusters:updatedClusters.concat(newCluster2)}
        }

        default:{
            return state;
        }
    }
   
}
export default ClusterReducer;