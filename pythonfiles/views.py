from flask import Blueprint, render_template
from flask_login import login_required, current_user
from .models import Producto, Administradores

views = Blueprint('views', __name__, template_folder='templates')

@views.route('/')
def home():
    return render_template('home.html', user = current_user)

@views.route('/AboutUs')
def aboutus():
    return render_template('home.html', user = current_user)

@views.route('/HomePage')
@login_required
def homepage():

    producto = Producto.query.all()
    admins = Administradores.query.all()
    return render_template('homepage.html', user = current_user, producto = producto, admins = admins)
