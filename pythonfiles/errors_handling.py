from flask import Blueprint, render_template
from werkzeug.exceptions import InternalServerError

errors_handling = Blueprint('errors_handling', __name__, template_folder='errorsTemplates')

@errors_handling.app_errorhandler(404)
def page_not_found(e):
    return render_template('error404.html')
