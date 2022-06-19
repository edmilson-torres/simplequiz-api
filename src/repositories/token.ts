import TokenModel from '../database/models/token';

class TokenRepository {
    public async findById(id: string) {
        return await TokenModel.findOne({ id });
    }

    public async deleteToken(id: string) {
        return await TokenModel.deleteOne({ id });
    }
}
export default new TokenRepository();
