'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lembur extends Model {
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
  lembur.init({
    id_lembur:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tanggal: DataTypes.DATE,
    alasan: DataTypes.TEXT,
    status: DataTypes.ENUM('pending','approved','reject')
  }, {
    sequelize,
    modelName: 'lembur',
    tableName: 'lembur',
  });
  return lembur;
};