module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    analysis: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  return Activity;
};
