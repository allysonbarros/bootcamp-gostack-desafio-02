import { Sequelize, Model } from 'sequelize';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.TEXT,
        answer: Sequelize.TEXT,
        answered_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default HelpOrder;
