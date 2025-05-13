const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./aluno'); 
class Curso extends Model {}

Curso.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracao: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Curso',
  }
);


Curso.belongsToMany(Aluno, {
  through: 'AlunoCurso', // Tabela intermediária
  foreignKey: 'cursoId',
});

Aluno.belongsToMany(Curso, {
  through: 'AlunoCurso', 
  foreignKey: 'alunoId',
});

module.exports = Curso;
