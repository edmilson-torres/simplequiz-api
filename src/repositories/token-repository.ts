import ResetPasswordTokenModel from '../database/models/resetPasswordToken';

class ResetPasswordTokenRepository {
    public findById(id: string) {
        return ResetPasswordTokenModel.findOne({ userId: id });
    }

    public deleteToken(id: string) {
        return ResetPasswordTokenModel.deleteOne({ userId: id });
    }

    public insertUserToken(userToken: Object) {
        return ResetPasswordTokenModel.create(userToken);
    }
}
export default new ResetPasswordTokenRepository();
