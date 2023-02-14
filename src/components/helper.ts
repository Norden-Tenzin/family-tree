import {SOURCES} from '../components/const';

export const getNodeName = function(nodeId: string) {
    const nodes = SOURCES['family-tree.json']
    for (var node of nodes){
        if (node.id == nodeId){
            return node.name
        }
    }
    return "-"
}