from flask import Flask, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = '9a47151b68c2bb469509f36e33cf2a79040dc4cd'
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bds/base_de_datos.db'
db.create_all(app = app)

#Inicinado el LoginManager
from pythonfiles.models import Producto, Usuario, Administradores

login_manager = LoginManager()
login_manager.login_view='auth.login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(id):
    return Usuario.query.get(int(id))

#Definiendo si el usuario puede acceder a las funciones de administrador
def admin_access():
    for admin in Administradores.query.all():
        if current_user.email == admin.email:
            access_admin = True
            break
        else:
            access_admin = False
    
    return access_admin




# Blueprints
from .views import views
from .auth import auth
from .products_managment import products
from .errorhandler import errorhandler

app.register_blueprint(views, url_prefix = "")
app.register_blueprint(auth, url_prefix = "")
app.register_blueprint(products, url_prefix = "")
app.register_blueprint(errorhandler, url_prefix = "")




#Flask_admin configuration
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
# Delimiatando quienes pueden tener acceso al administrador
class MyModelView(ModelView):
    def is_accessible(self):

        return admin_access()
    
    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('views.homepage'))

#Iniciando y declarando las tablas que se pueden manejar
admin = Admin(app)
admin.add_view(MyModelView(Administradores, db.session))
admin.add_view(MyModelView(Producto, db.session))
admin.add_view(MyModelView(Usuario, db.session))

