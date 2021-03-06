import os
from flask import Blueprint, render_template, flash, abort, redirect, url_for
from flask.helpers import url_for
from flask_login import login_required, current_user
from werkzeug.utils import redirect
from .models import Producto
from .forms import UploadProduct
from pythonfiles import app, db, admin_access
import secrets

products = Blueprint('products', __name__, template_folder='templates')

# def admin_access():
#     for admin in Administradores.query.all():
#         if current_user.email == admin.email:
#             access_admin = True
#             break
#         else:
#             access_admin = False
    
#     return access_admin


DEFAULT_IMG = 'default.png'


def save_picture(form_picture):
    #Se le pone un nombre aleatorio al nuevo archivo para que sea propio
    random_hex = secrets.token_hex(8)        
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/product_pics', picture_fn)
    form_picture.save(picture_path)

    return picture_fn

def delete_image(path):
    try:
        os.remove(path)
    except:
        pass



@products.route('/AddProduct', methods = ['POST', 'GET'])
@login_required
def add():
    if admin_access():

        form = UploadProduct()

        if form.validate_on_submit():
            price_rounded = "{:.2f}".format(form.price.data)
            
            print(form.name.data, price_rounded, form.info.data, form.picture.data)

            #Verificando si se mandó una imagen o no
            if form.picture.data:
                picture_file = save_picture(form.picture.data)
                print(picture_file)
            else:
                picture_file = DEFAULT_IMG


            new_product = Producto(producto_name = form.name.data, producto_inf = form.info.data, producto_img = picture_file, producto_cst = price_rounded)
            db.session.add(new_product)
            db.session.commit()


            flash('Product added succesfully!', category = 'success')

            return redirect(url_for('views.homepage'))
        else:
            return render_template('addProduct.html', form = form, user = current_user)
        
    abort(404)
    

@products.route('/EditProduct/<string:id>', methods = ['POST', 'GET'])
@login_required
def edit(id):
    if admin_access():

        form = UploadProduct()
        producto2edit = Producto.query.filter_by(id = id).first()

        #ELIMINAR IMAGEN ORIGINAL, SINO SE JUNTAAAN
        imagen_original = producto2edit.producto_img
        path = f'pythonfiles/static/product_pics/{imagen_original}'

        form.submit.label.text = 'Update Product'

        if form.validate_on_submit():
            price_rounded = "{:.2f}".format(form.price.data)

            producto2edit.producto_name = form.name.data
            producto2edit.producto_inf = form.info.data

            if form.picture.data:
                picture_file = save_picture(form.picture.data)
                print(picture_file)

                if imagen_original != DEFAULT_IMG:
                    delete_image(path)
            else:
                if imagen_original !=DEFAULT_IMG:
                    picture_file = imagen_original
                else:
                    picture_file = DEFAULT_IMG


            # producto2edit.producto_img = 
            producto2edit.producto_cst = price_rounded
            producto2edit.producto_img = picture_file

            db.session.commit()

            flash('Product updated successfully')
            return redirect(url_for('views.homepage'))
        else:
            form.name.data = producto2edit.producto_name
            form.info.data = producto2edit.producto_inf
            form.price.data = producto2edit.producto_cst

            return render_template('editProduct.html', user = current_user, form = form)
    
    abort(404)


@products.route('/DeleteProduct/<string:id>')
@login_required
def delete(id):
    if admin_access():

        deleteProduct = Producto.query.get(id)
        
        img = deleteProduct.producto_img

        path = f'pythonfiles/static/product_pics/{img}'
        
        if img != DEFAULT_IMG:
            delete_image(path)


        flash(f'Product {deleteProduct.producto_name} deleted successfully', category = 'success')
        
        db.session.delete(deleteProduct)
        db.session.commit()

        return redirect(url_for('views.homepage'))

    abort(404)