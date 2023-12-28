'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.PublicKeyCredentials, { foreignKey: "user_id" })
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            handle: {
                type: DataTypes.BLOB,
                unique: true,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
        }
    )
    return User
}
