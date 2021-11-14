from pythonfiles import db
from flask_login import UserMixin

#   Modelo de base de datos
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    producto_name = db.Column(db.String(20), nullable = False, default = 'Producto', unique = True)
    producto_inf = db.Column(db.String(10000), nullable = False, default = "Texto")
    producto_img = db.Column(db.String(20), nullable = False, default = 'default')
    producto_cst = db.Column(db.Integer, nullable = False, default = 666)

class Usuario(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(255), unique = True)
    user = db.Column(db.String(255))
    password = db.Column(db.String(255))

    def __repr__(self):
        return f"Usuario('{self.email}' , '{self.user}')"

class Administradores(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(255), unique = True)

class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    
