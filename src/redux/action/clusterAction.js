import { clusterActionTypes } from "../types";

export const addClusters=(newCluster)=>{
    return({type:clusterActionTypes.ADD_CLUSTERS,clusters:newCluster})
};
export const removeCluster=(index)=>{
    return({type:clusterActionTypes.REMOVE_CLUSTER,index:index})
}
export const updateService=(cluster)=>{
    return({type:clusterActionTypes.UPDATE_CLUSTER,cluster:cluster})
}