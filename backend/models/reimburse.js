'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reimburse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users,{
        foreignKey: "id_user",
        as: "users"
      })
    }
  }
  reimburse.init({
    id_reimburse:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_user: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    nominal: DataTypes.INTEGER,
    deskripsi: DataTypes.TEXT,
    status: DataTypes.ENUM('pending','approved','reject')
  }, {
    sequelize,
    modelName: 'reimburse',
    tableName: 'reimburse',
  });
  return reimburse;
};