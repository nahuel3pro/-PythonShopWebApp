from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = '9a47151b68c2bb469509f36e33cf2a79040dc4cd'
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bds/base_de_datos.db'
db.create_all(app = app)

from .views import views
from .auth import auth
from .products_managment import products
app.register_blueprint(views, url_prefix = "")
app.register_blueprint(auth, url_prefix = "")
app.register_blueprint(products, url_prefix = "")

#Inicinado el LoginManager
from pythonfiles.models import Producto, Usuario

login_manager = LoginManager()
login_manager.login_view='auth.login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(id):
    return Usuario.query.get(int(id))

#Flask_admin
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
admin = Admin(app)
admin.add_view(ModelView(Usuario, db.session))