'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class absen extends Model {
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
  absen.init({
    id_absen:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_user: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    jam_masuk: DataTypes.TIME,
    jam_keluar: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'absen',
    tableName: 'absen',
  });
  return absen;
};