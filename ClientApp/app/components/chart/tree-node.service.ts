import { Injectable } from "@angular/core";
import { TREEDATA } from "./mock-tree-nodes";
import { TreeNode } from "./tree-node";
import Promise from "ts-promise";

@Injectable()
export class TreeNodeService {
    getTreeNodes(): Promise<TreeNode> {
        return Promise.resolve(TREEDATA);
    }
}