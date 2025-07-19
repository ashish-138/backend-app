import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  fullname: string;
  email: string;
  password: string;
  gender: string;
  mobile: string;
  status: string;
  createdAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'status' | 'createdAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public gender!: string;
  public mobile!: string;
  public status!: string;
  public createdAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    mobile: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'inactive',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
