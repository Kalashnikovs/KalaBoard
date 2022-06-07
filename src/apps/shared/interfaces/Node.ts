import { Snowflake } from '../types/Snowflake';

export interface INode {
    id: Snowflake;
    title: string;
    description: string;
    type: NodeType;
    parentId: Snowflake;
    displayOrder: number;
}

export enum NodeType {
    NONE = 0,
    CATEGORY = 1,
    FORUM = 2,
}

export interface ICategory {
    id: Snowflake;
    nodeId: Snowflake;
}

export interface IForum {
    id: Snowflake;
    nodeId: Snowflake;
    type: ForumType;
    threadCount: Number;
}

export enum ForumType {
    NONE = 0,
    DISCUSSION = 1,
}
