import { Model } from 'mongoose';

export class ModelService<T extends {}> {
    constructor(private _model: Model<T>) {}

    async getBySnowflakeId(id: string) {
        return this._model.findOne({ id });
    }
}
