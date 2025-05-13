 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Curso = require('./curso');  

class Aluno extends Model {}

Aluno.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Aluno',
  }
);

 
Aluno.belongsToMany(Curso, {
  through: 'AlunoCurso', // Tabela intermediária
  foreignKey: 'alunoId',
});

Curso.belongsToMany(Aluno, {
  through: 'AlunoCurso', 
  foreignKey: 'cursoId',
});

module.exports = Aluno;
