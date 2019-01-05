'use strict';

var _ = require('lodash');
var shortid = require('shortid');


const Sequelize = require('sequelize');

const sequelize = new 
//Sequelize('postgres://angel:Sephiroth26435@localhost:5432/angel');
Sequelize('postgres://angel:Sephiroth26435@104.196.193.42/angel');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//Conexion y operaciones a la tabla de base de datos
const Operadores = sequelize.define('usuarios', {
	nombre: {
	  type: Sequelize.STRING
	},
	contraseña: {
    type: Sequelize.STRING
  }
  });
  
////////////////////////////////////////////////////////////////////////////////
// PROPERTIES
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function getOperadores(params) {
   
    return new Promise(function(resolve, reject) {
        Operadores.findAll().then(operadores => {
            resolve(operadores);
       })
      });
}

function getOperadorById(id) {
  return new Promise(function(resolve, reject) {
    Operadores.findById(id).then(operadores => {
      console.log(operadores);
      resolve(operadores);
    })
  })
}


function createOperador(body) {

  console.log('Body %s ', body.nombre);
  
  return new Promise(function(resolve, reject) {
  
    console.log('Body %s ', body.nombre);
    Operadores
     .create({ 
               nombre: body.nombre,
               contraseña: body.contraseña
            })
            .then(myoperador => resolve(myoperador))
            .catch(error => resolve(error));
  
    });

}


function deleteOperador(id) {

  var idToSearch = id;

  return new Promise(function(resolve, reject) {
    
  Operadores
    .findById(id)
    .then(myoper => {
      console.log("Result of findById: " + myoper);
      if (!myoper) {
        resolve({});
      }
      return myoper
        .destroy()
        .then(() => resolve(myoper))
        .catch(error => resolve(error));
    })
    .catch(error => {
      console.log("There was an error: " + error);
      resolve(error);
    });

  });
}

function updateOperador(body) {
  return new Promise(function(resolve, reject) {
    Operadores
      .findById(body.id)
      .then(myoper => {
        console.log("Result of findById: " + myoper);
        if (!myoper) {
          resolve({});
        }
        return myoper
          .update({ 
            nombre: body.nombre, 
            contraseña: body.contraseña
          })
          .then(() => resolve(myoper))
          .catch(error => resolve(error));
      })
      .catch(error => {
        console.log("There was an error: " + error);
        resolve(error);
      });
  });
}

module.exports = {
  getOperadores,
  getOperadorById,
  createOperador,
  updateOperador,
  deleteOperador
}
