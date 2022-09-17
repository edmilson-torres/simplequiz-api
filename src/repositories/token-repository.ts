import ResetPasswordTokenModel from '../database/models/resetPasswordToken';

class ResetPasswordTokenRepository {
    public findById(id: string) {
        return ResetPasswordTokenModel.findOne({ _id: id }).lean();
    }

    public deleteToken(id: string) {
        return ResetPasswordTokenModel.deleteOne({ _id: id });
    }

    public insertUserToken(userToken: Object) {
        return ResetPasswordTokenModel.create(userToken);
    }
}
export default new ResetPasswordTokenRepository();
