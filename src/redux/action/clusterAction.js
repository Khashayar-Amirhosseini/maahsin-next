import { clusterActionTypes } from "../types";

export const addClusters=(newCluster)=>{
    return({type:clusterActionTypes.ADD_CLUSTERS,clusters:newCluster})
};
export const removeCluster=(index)=>{
    return({type:clusterActionTypes.REMOVE_CLUSTER,index:index})
}
export const updateCluster=(cluster)=>{
    return({type:clusterActionTypes.UPDATE_CLUSTER,cluster:cluster})
}
export const addSubServices=(index,subServices)=>{
    return({type:clusterActionTypes.ADD_SUB_SERVICES,subServices:subServices,index:index})
}
export const updateSubService=(index,SubService)=>{
    return({type:clusterActionTypes.UPDATE_SUB_SERVICE,SubService:SubService,index:index})
}
export const removeSubService=(index,subServicesIndex)=>{
    return({type:clusterActionTypes.REMOVE_SUB_SERVICE,index:index,subServicesIndex:subServicesIndex})
}