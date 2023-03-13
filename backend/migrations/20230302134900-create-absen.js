'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('absen', {
      id_absen: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id_user"
        }
      },
      tanggal: {
        type: Sequelize.DATE
      },
      jam_masuk: {
        type: Sequelize.TIME
      },
      jam_keluar: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('absen');
  }
};