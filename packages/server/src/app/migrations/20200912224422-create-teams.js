module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("teams", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("teams");
  },
};
