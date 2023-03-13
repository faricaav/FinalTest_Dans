'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.lembur,{
        foreignKey: "id_user",
        as: "lembur_user"
      })
      this.hasMany(models.reimburse,{
        foreignKey: "id_user",
        as: "reimburse_user"
      })
      this.hasMany(models.absen,{
        foreignKey: "id_user",
        as: "absen_user"
      })
    }
  }
  users.init({
    id_user:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('karyawan','hr')
  }, {
    sequelize,
    modelName: 'users',
    tableName: 'users',
  });
  return users;
};