import os
from flask import Blueprint, render_template, flash, request
from flask.helpers import url_for
from flask_login import login_required, current_user
from werkzeug.utils import redirect
from .models import Producto, Administradores
from .forms import UploadProduct
from pythonfiles import app, db, views

products = Blueprint('products', __name__, template_folder='templates')


def save_picture(form_picture):
    f_name, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = f_name + f_ext
    picture_path = os.path.join(app.root_path, 'static/product_pics', picture_fn)
    form_picture.save(picture_path)

    return picture_fn


@products.route('/AddProduct', methods = ['POST', 'GET'])
@login_required
def add():
    form = UploadProduct()

    if form.validate_on_submit():
        price_rounded = "{:.2f}".format(form.price.data)
        
        print(form.name.data, price_rounded, form.info.data, form.picture.data)

        picture_file = save_picture(form.picture.data)

        print(picture_file)

        new_product = Producto(producto_name = form.name.data, producto_inf = form.info.data, producto_img = picture_file, producto_cst = price_rounded)
        db.session.add(new_product)
        db.session.commit()


        flash('Product added succesfully!', category = 'success')
        producto = Producto.query.all()
        admins = Administradores.query.all()
        return render_template('homepage.html', user = current_user, producto = producto, admins = admins)
    else:
        return render_template('addProduct.html', form = form, user = current_user)

@products.route('/EditProduct/<string:id>', methods = ['POST', 'GET'])
@login_required
def edit(id):
    form = UploadProduct()
    value = Producto.query.filter_by(id = id).first()

    for admin in Administradores.query.all():
        if current_user.email == admin.email:
            if form.validate_on_submit():
                price_rounded = "{:.2f}".format(form.price.data)
                producto2edit = Producto.query.filter_by(id = id).first()

                producto2edit.producto_name = form.name.data
                producto2edit.producto_inf = form.info.data

                picture_file = save_picture(form.picture.data)

                # producto2edit.producto_img = 
                producto2edit.producto_cst = price_rounded
                producto2edit.producto_img = picture_file

                db.session.commit()

            else:
                form.name.data = value.producto_name
                form.info.data = value.producto_inf
                form.price.data = value.producto_cst

                return render_template('editProduct.html', user = current_user, form = form)
    
    return redirect(url_for('views.homepage'))