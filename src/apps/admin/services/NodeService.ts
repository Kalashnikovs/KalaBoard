import { Snowflake } from '../../shared/types/Snowflake';
import { INode, NodeType, ICategory } from '../../shared/interfaces/Node';
import Node from '../../shared/models/Node';
import Category from '../../shared/models/Category';
import { generateSnowflake } from '../../shared/helpers/Snowflake';
import { ThrowExtendedError } from '../../shared/helpers/error';

export class NodeService {
    static async isValidNodeId(id: Snowflake): Promise<boolean> {
        return (await Node.findOne({ id })) ? true : false;
    }

    static async isValidCategoryId(id: Snowflake): Promise<boolean> {
        return (await Category.findOne({ nodeId: id })) ? true : false;
    }

    static getNodes() {
        return Node.find({});
    }

    static getNode(id: Snowflake) {
        return Node.findOne({ id });
    }

    static async addCategory(node: INode) {
        if (node.parentId !== '0' && !(await this.isValidNodeId(node.parentId)))
            ThrowExtendedError('Invalid Parent NODE ID', 422);

        await Node.create(node);
        return Category.create({
            id: generateSnowflake(),
            nodeId: node.id,
        });
    }

    static async editCategory(id: Snowflake, data: ICategory) {
        await Node.updateOne({ id }, data);
    }

    static async deleteCategory(id: Snowflake) {
        await Category.deleteOne({ nodeId: id });
        await Node.deleteOne({ id });
    }
}
