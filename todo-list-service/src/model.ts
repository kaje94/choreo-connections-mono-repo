import { Sequelize, INTEGER, BOOLEAN, STRING } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export const TodoModel = sequelize.define("todo", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: { type: STRING, allowNull: false },
  completed: { type: BOOLEAN, allowNull: false, defaultValue: false },
});
