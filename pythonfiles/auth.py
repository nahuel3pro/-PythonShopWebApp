from flask import Blueprint, render_template, flash, redirect, url_for
from .forms import RegistrationForm, LoginForm
from .models import Usuario
from werkzeug.security import generate_password_hash, check_password_hash
from pythonfiles import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__, template_folder='templates')

@auth.route('/signup', methods = ['POST', 'GET'])
def signup():
    form = RegistrationForm()

    if form.validate_on_submit():
        flash('Registration completed successfully!', category = 'success')

        new_user = Usuario(email = form.email.data, user = form.username.data,
                         password = generate_password_hash(form.password.data, method = 'sha256'))

        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('views.homepage', user = current_user))


    return render_template('signup.html', form = form, user = current_user)

@auth.route('/login', methods = ['POST','GET'])
def login():
    form = LoginForm()
    
    check = Usuario.query.filter_by(email = form.email.data).first()

    if form.validate_on_submit():
        if check:
            if check_password_hash(check.password,  form.password.data):
                flash('Logged in successfully!', category = 'success')
                login_user(check, remember = form.remember.data)
                return redirect(url_for('views.homepage', user = current_user))
            else:
                flash('Incorrect password', category = 'error')
        else:
            flash('Email does not exist', category = 'error')

    return render_template('login.html', form = form, user = current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.home', user = current_user))

