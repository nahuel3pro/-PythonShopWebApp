from flask import Blueprint, render_template
from werkzeug.exceptions import InternalServerError

errors_handling = Blueprint('errors_handling', __name__, template_folder='templates')

@errors_handling.errorhandler(404)
def page_not_found(e):
    return render_template('homepage.html')
