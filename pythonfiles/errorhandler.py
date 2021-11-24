# Solamente errores
from flask import Blueprint, render_template

errorhandler = Blueprint('errorhandler', __name__, template_folder='templates/errorsTemplates')

@errorhandler.app_errorhandler(404)
def page_not_found(error):
    return render_template('error404.html', error = error)

