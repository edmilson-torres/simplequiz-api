import ResetPasswordTokenModel from '../database/models/resetPasswordToken';

class ResetPasswordTokenRepository {
    public async findById(id: string) {
        return await ResetPasswordTokenModel.findOne({ id }).lean();
    }

    public async deleteToken(id: string) {
        return await ResetPasswordTokenModel.deleteOne({ id });
    }
}
export default new ResetPasswordTokenRepository();
