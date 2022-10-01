import ResetPasswordTokenModel from '../database/models/resetPasswordToken';

interface FindByIdProtocol {
    userId: string;
    token: string;
}
class ResetPasswordTokenRepository {
    async findById(id: string): Promise<FindByIdProtocol | null> {
        const data = await ResetPasswordTokenModel.findOne({
            userId: id
        });
        return data;
    }

    deleteToken(id: string) {
        return ResetPasswordTokenModel.deleteOne({ userId: id });
    }

    insertUserToken(userToken: Object) {
        return ResetPasswordTokenModel.create(userToken);
    }
}

export default new ResetPasswordTokenRepository();
