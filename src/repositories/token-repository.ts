import ResetPasswordTokenModel from '../database/models/resetPasswordToken';

interface FindByIdProtocol {
    userId: string;
    token: string;
}
class ResetPasswordTokenRepository {
    public findById(id: string): FindByIdProtocol {
        const { userId, token } = ResetPasswordTokenModel.findOne({
            userId: id
        });
        return { userId, token };
    }

    public deleteToken(id: string) {
        return ResetPasswordTokenModel.deleteOne({ userId: id });
    }

    public insertUserToken(userToken: Object) {
        return ResetPasswordTokenModel.create(userToken);
    }
}
export default new ResetPasswordTokenRepository();
