from flask import Blueprint, render_template, flash
from flask_login import login_required, current_user
from .models import Producto, Administradores
from .forms import UploadProduct

views = Blueprint('views', __name__, template_folder='templates')

@views.route('/')
def home():
    return render_template('home.html')

@views.route('/AboutUs')
def aboutus():
    return render_template('home.html')

@views.route('/HomePage')
@login_required
def homepage():

    producto = Producto.query.all()
    admins = Administradores.query.all()
    return render_template('homepage.html', user = current_user, producto = producto, admins = admins)
